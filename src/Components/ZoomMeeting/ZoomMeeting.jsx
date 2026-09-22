import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ZoomMeeting.css";

const decodeJwtPayload = (token) => {
    try {
        const payload = token?.split?.(".")?.[1];
        if (!payload) return null;
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = atob(normalized);
        return JSON.parse(json);
    } catch {
        return null;
    }
};

const isLeaveActionLabel = (raw = "") => {
    const text = String(raw).replace(/\s+/g, " ").trim().toLowerCase();
    if (!text) return false;
    return (
        text === "leave meeting" ||
        text === "end meeting" ||
        text === "end meeting for all" ||
        text.includes("leave meeting") ||
        text.includes("end meeting for all")
    );
};

const ZoomMeeting = ({ meetingData, profile }) => {
    const navigate = useNavigate();
    const zoomClientRef = useRef(null);
    const meetingRef = useRef(null);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    const signature = meetingData?.sdk?.signature;
    const meetingNumber = meetingData?.sdk?.meeting_number;
    const sdkKey = meetingData?.sdk?.sdk_key;
    const password = meetingData?.password ?? "";
    const userName = profile?.profile || "Customer";
    const userEmail = profile?.email || "";
    const zak = meetingData?.zak;

    useEffect(() => {
        setStatus("loading");
        setErrorMessage("");

        if (!signature || !meetingNumber || !sdkKey) {
            setStatus("error");
            setErrorMessage("Missing meeting credentials. Please rejoin the session.");
            return;
        }

        if (!window.ZoomMtgEmbedded) {
            setStatus("error");
            setErrorMessage("Zoom SDK failed to load. Refresh the page and try again.");
            return;
        }

        const cleanMeetingNumber = String(meetingNumber).replace(/\D/g, "");
        if (!cleanMeetingNumber) {
            setStatus("error");
            setErrorMessage("Invalid meeting number in video token.");
            return;
        }

        const jwtPayload = decodeJwtPayload(signature);
        if (jwtPayload?.exp && jwtPayload.exp * 1000 < Date.now()) {
            setStatus("error");
            setErrorMessage("Meeting signature expired. Go back and join the session again.");
            return;
        }

        const jwtMeetingNumber = String(jwtPayload?.mn || "").replace(/\D/g, "");
        if (jwtMeetingNumber && jwtMeetingNumber !== cleanMeetingNumber) {
            setStatus("error");
            setErrorMessage(
                "Meeting number does not match the signature. Please rejoin the session."
            );
            return;
        }

        const jwtSdkKey = jwtPayload?.sdkKey || jwtPayload?.appKey;
        if (jwtSdkKey && sdkKey && jwtSdkKey !== sdkKey) {
            console.warn("Zoom sdk_key does not match signature appKey/sdkKey", {
                sdkKey,
                jwtSdkKey,
            });
        }

        let cancelled = false;
        let joined = false;
        let meetingEnded = false;
        let leaveWatchTimer = null;
        const client = window.ZoomMtgEmbedded.createClient();
        zoomClientRef.current = client;

        const markJoined = () => {
            if (cancelled || meetingEnded || joined) return;
            joined = true;
            setErrorMessage("");
            setStatus("joined");
        };

        const markMeetingEnded = () => {
            if (cancelled || meetingEnded) return;
            meetingEnded = true;
            joined = false;
            if (leaveWatchTimer) {
                window.clearTimeout(leaveWatchTimer);
                leaveWatchTimer = null;
            }
            setErrorMessage("");
            setStatus("ended");

            // Tear down Zoom UI so it cannot cover the ended overlay
            try {
                window.ZoomMtgEmbedded?.destroyClient?.();
            } catch (e) {
                console.error("Zoom destroy after leave:", e);
            }
            zoomClientRef.current = null;
            if (meetingRef.current) {
                meetingRef.current.replaceChildren();
            }

            navigate("/dashboard/programs");
        };

        const scheduleEndedAfterLeaveClick = () => {
            if (leaveWatchTimer) window.clearTimeout(leaveWatchTimer);
            // Give Zoom time to finish leave, then force ended UI
            leaveWatchTimer = window.setTimeout(() => {
                markMeetingEnded();
            }, 600);
        };

        // join() often never settles in Component View — watch DOM for Zoom UI
        const rootObserver = new MutationObserver(() => {
            if (cancelled || meetingEnded) return;
            const root = meetingRef.current;
            if (!root) return;
            if (!joined && root.childElementCount > 0) {
                markJoined();
            }
        });

        // Leave/End confirmation lives in portaled poppers — catch the click
        const onDocumentClick = (event) => {
            if (cancelled || meetingEnded || !joined) return;
            const target = event.target;
            if (!(target instanceof Element)) return;
            const clickable = target.closest(
                "button, [role='button'], a, li, div[class*='leave'], div[class*='Leave']"
            );
            if (!clickable) return;
            if (isLeaveActionLabel(clickable.textContent || clickable.getAttribute("aria-label"))) {
                scheduleEndedAfterLeaveClick();
            }
        };

        try {
            if (typeof client.on === "function") {
                client.on("connection-change", (payload) => {
                    if (cancelled) return;
                    const state = String(payload?.state || payload?.status || "");
                    const normalized = state.toLowerCase();

                    if (normalized === "connected") {
                        markJoined();
                        return;
                    }

                    if (
                        normalized === "closed" ||
                        normalized === "fail" ||
                        normalized === "failed"
                    ) {
                        markMeetingEnded();
                    }
                });
            }
        } catch {
            // older SDK builds may not expose this event
        }

        document.addEventListener("click", onDocumentClick, true);

        const startMeeting = async () => {
            try {
                await new Promise((resolve) => requestAnimationFrame(resolve));
                if (cancelled || !meetingRef.current) return;

                const root = meetingRef.current;
                rootObserver.observe(root, { childList: true, subtree: true });

                await client.init({
                    zoomAppRoot: root,
                    language: "en-US",
                    patchJsMedia: true,
                    leaveOnPageUnload: true,
                    customize: {
                        video: {
                            isResizable: true,
                        },
                    },
                });

                if (cancelled) return;

                const joinParams = {
                    signature,
                    sdkKey,
                    meetingNumber: cleanMeetingNumber,
                    password: String(password || ""),
                    userName: String(userName || "Customer"),
                    userEmail: String(userEmail || ""),
                };

                if (zak) {
                    joinParams.zak = zak;
                }

                console.log("Zoom join params (safe):", {
                    meetingNumber: cleanMeetingNumber,
                    hasPassword: Boolean(password),
                    hasZak: Boolean(zak),
                    role: jwtPayload?.role,
                    sdkKeyPrefix: String(sdkKey).slice(0, 6),
                    signatureExp: jwtPayload?.exp
                        ? new Date(jwtPayload.exp * 1000).toISOString()
                        : null,
                });

                // Do not rely only on this promise — it can hang while the meeting is live
                const joinResult = client.join(joinParams);
                if (joinResult && typeof joinResult.then === "function") {
                    joinResult
                        .then(() => {
                            if (!cancelled) markJoined();
                        })
                        .catch((error) => {
                            if (cancelled || meetingEnded) return;
                            // Join can reject after the meeting UI is already live
                            if (joined || meetingRef.current?.childElementCount > 0) {
                                markJoined();
                                return;
                            }
                            console.error("Zoom join error:", error);
                            const code = error?.errorCode;
                            let message =
                                error?.reason ||
                                error?.message ||
                                "Failed to join the Zoom meeting.";

                            if (code === 200) {
                                message =
                                    "Zoom connection failed (error 200). Usually caused by an expired/invalid signature, wrong password, or a draft Zoom app joining a meeting outside your Zoom account. Rejoin from the schedule, and confirm the Meeting SDK app is published if the host is on another Zoom account.";
                            }

                            setStatus("error");
                            setErrorMessage(message);
                        });
                }

                // Fallback if join hangs but Zoom has already painted UI
                window.setTimeout(() => {
                    if (
                        !cancelled &&
                        !meetingEnded &&
                        !joined &&
                        meetingRef.current?.childElementCount > 0
                    ) {
                        markJoined();
                    }
                }, 1500);
            } catch (error) {
                if (cancelled || meetingEnded) return;
                if (joined || meetingRef.current?.childElementCount > 0) {
                    markJoined();
                    return;
                }
                console.error("Zoom join error:", error);
                const code = error?.errorCode;
                let message =
                    error?.reason ||
                    error?.message ||
                    "Failed to join the Zoom meeting.";

                if (code === 200) {
                    message =
                        "Zoom connection failed (error 200). Usually caused by an expired/invalid signature, wrong password, or a draft Zoom app joining a meeting outside your Zoom account. Rejoin from the schedule, and confirm the Meeting SDK app is published if the host is on another Zoom account.";
                }

                setStatus("error");
                setErrorMessage(message);
            }
        };

        startMeeting();

        return () => {
            cancelled = true;
            rootObserver.disconnect();
            document.removeEventListener("click", onDocumentClick, true);
            if (leaveWatchTimer) window.clearTimeout(leaveWatchTimer);

            const cleanup = async () => {
                try {
                    if (joined && zoomClientRef.current) {
                        await zoomClientRef.current.leaveMeeting?.();
                    }
                } catch {
                    // already left / not joined
                }
                try {
                    window.ZoomMtgEmbedded?.destroyClient?.();
                } catch (e) {
                    console.error("Zoom cleanup error:", e);
                }
                zoomClientRef.current = null;
            };
            cleanup();
        };
    }, [signature, meetingNumber, sdkKey, password, userName, userEmail, zak, navigate]);

    return (
        <div
            className={`zoom-meeting-shell${
                status === "ended" ? " zoom-meeting-shell--ended" : ""
            }`}
        >
            <div
                ref={meetingRef}
                id="zoom-meeting"
                aria-hidden={status === "ended" || status === "error"}
            />
            {status === "loading" && (
                <div className="zoom-meeting-status">Connecting to meeting...</div>
            )}
            {status === "ended" && (
                <div className="zoom-meeting-status zoom-meeting-status--ended">
                    Meeting ended
                </div>
            )}
            {status === "error" && (
                <div className="zoom-meeting-status zoom-meeting-status--error">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default ZoomMeeting;
