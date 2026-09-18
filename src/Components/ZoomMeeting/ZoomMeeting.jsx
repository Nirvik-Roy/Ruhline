import { useEffect, useRef } from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const ZoomMeeting = ({ meetingData, user }) => {
    const zoomClientRef = useRef(null);

    useEffect(() => {
        if (!meetingData?.sdk?.signature) return;

        const client = ZoomMtgEmbedded.createClient();

        zoomClientRef.current = client;

        const meetingSDKElement = document.getElementById("zoom-meeting");

        const startMeeting = async () => {
            try {
                await client.init({
                    zoomAppRoot: meetingSDKElement,
                    language: "en-US",
                });

                await client.join({
                    signature: meetingData.sdk.signature,
                    meetingNumber: meetingData.sdk.meeting_number,
                    password: meetingData.password,
                    userName: user.name,
                    userEmail: user.email,
                });

                console.log("Joined Zoom meeting");
            } catch (error) {
                console.error("Zoom join error:", error);
            }
        };

        startMeeting();
    }, [meetingData, user]);

    return (
        <div
            id="zoom-meeting"
            style={{
                width: "100%",
                height: "700px",
            }}
        />
    );
};

export default ZoomMeeting;