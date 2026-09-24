import React, { useEffect, useRef, useState } from "react";
import "./DashboardProgram.css";
import arrow from "../../../assets/Images/Vector (4).svg";
import download from "../../../assets/Images/Layer_1 (1).svg";
import video from "../../../assets/Images/Group 1597882967.png";
import down from "../../../assets/Images/Chevron.svg";
import heartIcon from "../../../assets/Images/Layer_1 (2).svg";
import cardIcon from "../../../assets/Images/Layer_1 (3).svg";
import wheelIcon from "../../../assets/Images/Capa_1 (2).svg";
import frameIcon from "../../../assets/Images/Frame.svg";
import goalIcon from "../../../assets/Images/Layer 9.svg";
import questionIcon from "../../../assets/Images/Icon (2).svg";
import habbitIcon from "../../../assets/Images/Layer_1 (4).svg";
import userIcon from "../../../assets/Images/Group 1597882969 (1).svg";
import ValuesContent from "./ValuesContent";
import CardGameContent from "./CardGame/CardGameContent";
import WheelLife from "./WheelLife/WheelLife";
import GoalSetting from "./GoalSetting.jsx";
import FindMotivation from "./FindMotivation";
import WhoAmI from "./WhoAmI";
import WaitingModal from "./WaitingModal";
import HabitTracker from "./HabitTracker";
import tick from "../../../assets/Images/Layer_1.svg";
import {
  checkLockUnlock,
  getCardGameState,
  getGoalSettings,
  getHabitTrackerState,
  getlifeElements,
  getMotivationWords,
  getprogramResources,
  getProgramsModule,
  getSingleProgram,
  getValuesQuestions,
  getWhoamIQuestions,
  getIntermediateValues,
  getIntermediateEightCommonMistakes,
  getIntermediateGoalSettings,
  getIntermediateQuestionsGoalWhy,
  getIntermediateYMethod,
  joinMeeting,
} from "../../../utils/program";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Loaders from "../../../Components/Loaders/Loaders";
import toast from "react-hot-toast";
import DashboardLoader from "../../../Components/Loaders/DashboardLoader.jsx";
import ZoomMeeting from "../../../Components/ZoomMeeting/ZoomMeeting.jsx";
import ValuesModal from "./IntermediateSteps/ValuesModal.jsx";
import CommonMistakesModal from "./IntermediateSteps/CommonMistakesModal.jsx";
import GoalSettingsModal from "./IntermediateSteps/GoalSettingsModal.jsx";
import TheYMethodModal from "./IntermediateSteps/TheYMethodModal.jsx";
import QuestionForEachGoalModal from "./IntermediateSteps/QuestionForEachGoalModal.jsx";

const readStoredVideoToken = () => {
  try {
    return JSON.parse(localStorage.getItem("video_token"));
  } catch {
    return null;
  }
};

const normalizeMeetingData = (token) => {
  if (!token) return null;

  const sdk = token?.sdk || {};
  const signature = sdk?.signature || token?.signature;
  const meetingNumber =
    sdk?.meeting_number ||
    sdk?.meetingNumber ||
    token?.meeting_number ||
    token?.meetingNumber;
  const sdkKey =
    sdk?.sdk_key ||
    sdk?.sdkKey ||
    sdk?.client_id ||
    token?.sdk_key ||
    token?.sdkKey;
  const password =
    token?.password ??
    token?.passWord ??
    token?.meeting_password ??
    sdk?.password ??
    "";
  const zak = token?.zak || token?.zak_token || "";

  if (!signature || !meetingNumber || !sdkKey) return null;

  return {
    password,
    zak,
    session_id: token?.session_id,
    sdk: {
      signature,
      meeting_number: meetingNumber,
      sdk_key: sdkKey,
    },
  };
};

const SPECIAL_MODULE_TITLES = [
  "Intermediate - Values",
  "Intermediate - Eight most common mistakes",
  "Intermediate - Goal Settings",
  "Intermediate - The Y Method",
  "Intermediate - Questions for each goal - why?",
  "Upload Documents",
];

const TRACKED_COMPLETION_TITLES = [
  "Values",
  "Find your Motivation",
  "Who am I",
  "Wheel of Life",
  "Card Game",
  "Goal Settings",
  "Habit Tracker",
];

const withNormalizedProgress = (data) => {
  if (!data || typeof data !== "object") return data || {};
  return {
    ...data,
    progress: {
      ...(data.progress || {}),
      is_completed: Boolean(data?.progress?.is_completed),
    },
  };
};

const isGoalSettingsCompleted = (content) => {
  if (!content?.program_structure_id) return undefined;
  return (
    Boolean(content?.progress?.is_completed) ||
    (Array.isArray(content?.goals) && content.goals.length > 0)
  );
};

const isHabitTrackerCompleted = (content) => {
  if (!content?.program_structure_id) return undefined;
  return (
    Boolean(content?.progress?.is_completed) ||
    (Array.isArray(content?.habits) && content.habits.length > 0)
  );
};

const LiveProgram = () => {
  const { programId, enrollmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData } = useOutletContext();
  const [modalIsopen, setmodalIsopen] = useState(false);
  const [moduleOpen, setmoduleOpen] = useState(true);
  const [valuesContent, setvaluesContent] = useState({});
  const [goalsettingsContent, setgoalSettingsContent] = useState({});
  const [whoAmIContent, setwhoAmiIContent] = useState({});
  const [habbitContent, sethabbitContent] = useState({});
  const [lifeElements, setLifeelements] = useState({});
  const [cardGamestate, setCardGamestate] = useState({});
  const [motivationContent, setmotivationContent] = useState({});
  const [intermediateValuesContent, setIntermediateValuesContent] = useState({});
  const [intermediateMistakesContent, setIntermediateMistakesContent] = useState({});
  const [intermediateGoalSettingsContent, setIntermediateGoalSettingsContent] = useState({});
  const [intermediateYMethodContent, setIntermediateYMethodContent] = useState({});
  const [intermediateQuestionsGoalWhyContent, setIntermediateQuestionsGoalWhyContent] = useState({});
  const [modals, setmodals] = useState({
    values: false,
    commonMistakes: false,
    goalSettings: false,
    theYMethod: false,
    eachGoal: false,
  });
  const [id, setId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [loading, setloading] = useState(false);
  const [allProgramModules, setallProgramModules] = useState([]);
  const [resourcesloading, setresourcesloading] = useState(false);
  const [programResources, setprogramResources] = useState([]);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState("all");
  const [selectedResources, setSelectedResources] = useState([]);
  const resourcesDropdownRef = useRef(null);
  const prevCompletionRef = useRef({});
  const [singleProgramDetails, setsingleProgramDetails] = useState({});
  // Start true so ZoomMeeting is not mounted, then torn down when the program fetch begins
  const [singleLoading, setsingleLoading] = useState(true);
  const [meetingData, setMeetingData] = useState(() =>
    normalizeMeetingData(readStoredVideoToken()),
  );
  const [meetingReady, setMeetingReady] = useState(false);

  const canJoinZoom = Boolean(
    meetingData?.sdk?.signature &&
    meetingData?.sdk?.meeting_number &&
    meetingData?.sdk?.sdk_key,
  );

  const fetchSingleProgramFunc = async () => {
    setsingleLoading(true);
    const res = await getSingleProgram(programId);
    if (res) {
      setsingleProgramDetails(res);
    }
    setsingleLoading(false);
  };

  useEffect(() => {
    if (programId) {
      fetchSingleProgramFunc();
    }
  }, [programId]);

  // Always refresh Zoom signature on enter — stale/ineffective JWTs commonly cause error 200
  useEffect(() => {
    let cancelled = false;

    const refreshVideoToken = async () => {
      const stored = readStoredVideoToken();
      const sessionId =
        location.state?.sessionId || stored?.session_id || stored?.sessionId;

      if (enrollmentId && sessionId) {
        const res = await joinMeeting(enrollmentId, sessionId, {
          silent: true,
        });
        if (!cancelled && res?.success && res?.data) {
          const nextToken = { ...res.data, session_id: sessionId };
          localStorage.setItem("video_token", JSON.stringify(nextToken));
          setMeetingData(normalizeMeetingData(nextToken));
          setMeetingReady(true);
          return;
        }
      }

      if (!cancelled) {
        setMeetingData(normalizeMeetingData(stored));
        setMeetingReady(true);
      }
    };

    refreshVideoToken();
    return () => {
      cancelled = true;
    };
  }, [enrollmentId, location.state?.sessionId]);

  const [tabs, setTabs] = useState({
    values: false,
    cardGame: false,
    wheel: false,
    goal: false,
    motivation: false,
    habit: false,
    whoAmI: false,
  });

  const tabsFunction = (id) => {
    setTabs({
      values: id == 1 ? true : false,
      cardGame: id == 2 ? true : false,
      wheel: id == 3 ? true : false,
      goal: id == 4 ? true : false,
      motivation: id == 5 ? true : false,
      habit: id == 6 ? true : false,
      whoAmI: id == 7 ? true : false,
    });
  };

  const MODULE_ICONS = {
    Values: heartIcon,
    "Find your Motivation": questionIcon,
    "Who am I": userIcon,
    "Wheel of Life": wheelIcon,
    "Card Game": cardIcon,
    "Habit Tracker": habbitIcon,
    "Goal Settings": goalIcon,
    "Intermediate - Values": '/Frame (2).png',
    "Intermediate - Eight most common mistakes": '/Frame (2).png',
    "Intermediate - Goal Settings": '/Frame (2).png',
    "Intermediate - The Y Method": '/Frame (2).png',
    "Intermediate - Questions for each goal - why?": '/Frame (2).png',
  };

  // useEffect(() => {
  //   if (valuesContent?.progress?.is_completed || motivationContent?.progress?.is_completed || whoAmIContent?.progress?.is_completed || lifeElements?.progress?.is_completed || cardGamestate?.navigation?.current_phase == 'completed' || habbitContent?.progress?.is_completed) {
  //     toast.success('You have already completed this module...')
  //   }

  // }, [valuesContent, motivationContent, whoAmIContent, lifeElements, cardGamestate])

  const MODULE_PROGRESS = {
    Values: valuesContent?.progress?.is_completed,
    "Find your Motivation": motivationContent?.progress?.is_completed,
    "Who am I": whoAmIContent?.progress?.is_completed,
    "Wheel of Life": lifeElements?.progress?.is_completed,
    "Card Game": cardGamestate?.navigation?.current_phase == "completed",
    "Goal Settings": isGoalSettingsCompleted(goalsettingsContent) === true,
    "Habit Tracker": isHabitTrackerCompleted(habbitContent) === true,
  };

  const tickStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "18px",
  };

  const resourcesList = Array.isArray(programResources)
    ? programResources
    : programResources?.documents || programResources?.resources || [];

  const getResourceName = (resource, index) =>
    resource?.document_name ||
    resource?.name ||
    resource?.title ||
    resource?.file_name ||
    `Document ${index + 1}`;

  const getResourceId = (resource, index) =>
    resource?.id ?? resource?.document_id ?? index;

  const getResourceUrl = (resource) => {
    const raw =
      resource?.file_url ||
      resource?.download_url ||
      resource?.document_url ||
      resource?.url ||
      resource?.file ||
      resource?.path ||
      resource?.file_path ||
      null;

    if (!raw || typeof raw !== "string") return null;
    if (/^https?:\/\//i.test(raw) || raw.startsWith("blob:") || raw.startsWith("data:")) {
      return raw;
    }

    const apiBase = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");
    const hostBase = apiBase.replace(/\/api\/v\d+$/i, "");
    return `${hostBase}/${raw.replace(/^\//, "")}`;
  };

  const downloadSingleResource = (resource, index) => {
    const url = getResourceUrl(resource);
    if (!url) {
      toast.error("Download link not available for this document");
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = getResourceName(resource, index);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const toggleResourceSelection = (resourceId) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId],
    );
  };

  const handleResourcesClickOutside = (event) => {
    if (
      resourcesDropdownRef.current &&
      !resourcesDropdownRef.current.contains(event.target)
    ) {
      setResourcesDropdownOpen(false);
    }
  };

  const fetchProgramResources = async (structureId) => {
    setresourcesloading(true);
    const res = await getprogramResources(enrollmentId, structureId);
    if (res?.success) {
      setprogramResources(res?.data || {});
    }
    setresourcesloading(false);
  };

  const isModuleCompleted = (module) =>
    module?.is_completed || MODULE_PROGRESS[module?.title];

  const isWheelOfLifeCompleted =
    Boolean(lifeElements?.progress?.is_completed) ||
    Boolean(
      allProgramModules?.find((m) => m?.title === "Wheel of Life")
        ?.is_completed,
    );

  const markWheelOfLifeCompleted = () => {
    setLifeelements((prev) => ({
      ...prev,
      progress: { ...(prev?.progress || {}), is_completed: true },
    }));
  };

  const fetchAllProgramModules = async () => {
    setloading(true);
    const res = await getProgramsModule(enrollmentId);
    const modules = res?.success ? res?.data?.modules || [] : [];
    if (res?.success) {
      setallProgramModules(modules);
    }
    setloading(false);
    return modules;
  };

  const fetchValuesQuestion = async (structureId) => {
    setloading(true);
    const res = await getValuesQuestions(Number(enrollmentId), structureId);
    if (res?.success) {
      setvaluesContent(withNormalizedProgress(res?.data || {}));
      // fetchProgramResources(structureId);
      tabsFunction(1);
    }
    setloading(false);
  };

  const fetchWhoamIQuestion = async (structureId) => {
    setloading(true);
    const res = await getWhoamIQuestions(Number(enrollmentId), structureId);
    if (res?.success) {
      setwhoAmiIContent(withNormalizedProgress(res?.data || {}));
      // fetchProgramResources(structureId);
      tabsFunction(7);
    }
    setloading(false);
  };

  const fetchMotivation = async (structureId) => {
    setloading(true);
    const res = await getMotivationWords(Number(enrollmentId), structureId);
    if (res?.success) {
      setmotivationContent(withNormalizedProgress(res?.data || {}));
      // fetchProgramResources(structureId);
      tabsFunction(5);
    }
    setloading(false);
  };

  const fetchWheelofLifeelements = async (structureId) => {
    setloading(true);
    const res = await getlifeElements(Number(enrollmentId), structureId);
    if (res?.success) {
      setLifeelements(withNormalizedProgress(res?.data || {}));
      // fetchProgramResources(structureId);
      tabsFunction(3);
    }
    setloading(false);
  };

  const fetchCardGameState = async (structureId) => {
    setloading(true);
    const res = await getCardGameState(Number(enrollmentId), structureId);
    if (res?.success) {
      setCardGamestate(res?.data || {});
      // fetchProgramResources(structureId);
      tabsFunction(2);
    }
    setloading(false);
  };

  const fetchHabitDetaisls = async (structureId) => {
    setloading(true);
    const res = await getHabitTrackerState(Number(enrollmentId), structureId);
    if (res?.success) {
      sethabbitContent(res?.data || {});
      // fetchProgramResources(structureId);
      tabsFunction(6);
    }
    setloading(false);
  };

  const setModal = (id) => {
    setmodals({
      values: id == 1 ? true : false,
      commonMistakes: id == 2 ? true : false,
      goalSettings: id == 3 ? true : false,
      theYMethod: id == 4 ? true : false,
      eachGoal: id == 5 ? true : false,
    });
  };

  const setGoalSettingsNormalized = (data) => {
    setgoalSettingsContent((prev) => {
      const next = { ...(data || {}) };
      if (!next.program_structure_id && prev?.program_structure_id) {
        next.program_structure_id = prev.program_structure_id;
      }
      if (!Array.isArray(next.goals)) {
        if (next.id || next.goal_name) {
          next.goals = [...(prev?.goals || []), next];
        } else {
          next.goals = prev?.goals || [];
        }
      }
      return next;
    });
  };

  const setHabitContentNormalized = (data) => {
    sethabbitContent((prev) => {
      const next = { ...(data || {}) };
      if (!next.program_structure_id && prev?.program_structure_id) {
        next.program_structure_id = prev.program_structure_id;
      }
      if (!Array.isArray(next.habits)) {
        if (next.id || next.habit_name) {
          next.habits = [...(prev?.habits || []), next];
        } else {
          next.habits = prev?.habits || [];
        }
      }
      return next;
    });
  };

  const fetchGoalSettings = async (structureId) => {
    setloading(true);
    const res = await getGoalSettings(Number(enrollmentId), structureId);
    if (res?.success) {
      setgoalSettingsContent(withNormalizedProgress(res?.data || {}));
      // fetchProgramResources(structureId);
      tabsFunction(4);
    }
    setloading(false);
  };

  const fetchIntermediateValues = async (structureId) => {
 
    const res = await getIntermediateValues(Number(enrollmentId), structureId);
    if (res?.success) {
      setIntermediateValuesContent(res?.data || {});
      setModal(1);
    }
  
  };

  const fetchIntermediateEightCommonMistakes = async (structureId) => {

    const res = await getIntermediateEightCommonMistakes(Number(enrollmentId), structureId);
    if (res?.success) {
      setIntermediateMistakesContent(res?.data || {});
      setModal(2);
    }
 
  };

  const fetchIntermediateGoalSettings = async (structureId) => {
   
    const res = await getIntermediateGoalSettings(Number(enrollmentId), structureId);
    if (res?.success) {
      setIntermediateGoalSettingsContent(res?.data || {});
      setModal(3);
    }
 
  };

  const fetchIntermediateYMethod = async (structureId) => {

    const res = await getIntermediateYMethod(Number(enrollmentId), structureId);
    if (res?.success) {
      setIntermediateYMethodContent(res?.data || {});
      setModal(4);
    }
 
  };

  const fetchIntermediateQuestionsGoalWhy = async (structureId) => {
  
    const res = await getIntermediateQuestionsGoalWhy(Number(enrollmentId), structureId);
    if (res?.success) {
      setIntermediateQuestionsGoalWhyContent(res?.data || {});
      setModal(5);
    }

  };

  const openModuleByTitle = (structureId, moduleName) => {
    if (moduleName == "Values") {
      fetchValuesQuestion(structureId);
    }

    if (moduleName == "Find your Motivation") {
      fetchMotivation(structureId);
    }

    if (moduleName == "Who am I") {
      fetchWhoamIQuestion(structureId);
    }

    if (moduleName == "Wheel of Life") {
      fetchWheelofLifeelements(structureId);
    }

    if (moduleName == "Card Game") {
      fetchCardGameState(structureId);
    }

    if (moduleName == "Habit Tracker") {
      fetchHabitDetaisls(structureId);
    }

    if (moduleName == "Goal Settings") {
      fetchGoalSettings(structureId);
    }

    if (moduleName == "Intermediate - Values") {
      fetchIntermediateValues(structureId);
    }

    if (moduleName == "Intermediate - Eight most common mistakes") {
      fetchIntermediateEightCommonMistakes(structureId);
    }

    if (moduleName == "Intermediate - Goal Settings") {
      fetchIntermediateGoalSettings(structureId);
    }

    if (moduleName == "Intermediate - The Y Method") {
      fetchIntermediateYMethod(structureId);
    }

    if (moduleName == "Intermediate - Questions for each goal - why?") {
      fetchIntermediateQuestionsGoalWhy(structureId);
    }

    if (moduleName == "Upload Documents") {
      fetchProgramResources(structureId);
    }
  };

  const fetchLockUnlockDetails = async (structureId, moduleName) => {
    setloading(true);
    const res = await checkLockUnlock(enrollmentId, structureId);
    if (res?.success) {
      openModuleByTitle(structureId, moduleName);
    } else {
      toast.error("Module is not unlocked yet!");
    }
    setloading(false);
  };

  const handleModuleCompleted = async (completedTitle) => {
    const modules = await fetchAllProgramModules();
    const current = modules.find((m) => m.title === completedTitle);
    if (!current) return;

    const next = modules
      .filter((m) => m.sort_order > current.sort_order)
      .sort((a, b) => a.sort_order - b.sort_order)[0];

    if (!next || !SPECIAL_MODULE_TITLES.includes(next.title)) return;

    const lock = await checkLockUnlock(
      enrollmentId,
      next.program_structure_id,
    );
    if (!lock?.success) return;

    openModuleByTitle(next.program_structure_id, next.title);
  };

  useEffect(() => {
    if (enrollmentId) {
      fetchAllProgramModules();
    }
  }, [enrollmentId]);

  useEffect(() => {
    document.addEventListener("click", handleResourcesClickOutside);
    return () => {
      document.removeEventListener("click", handleResourcesClickOutside);
    };
  }, []);

  useEffect(() => {
    const cardPhase = cardGamestate?.navigation?.current_phase;
    const currentCompletion = {
      Values: valuesContent?.progress?.is_completed,
      "Find your Motivation": motivationContent?.progress?.is_completed,
      "Who am I": whoAmIContent?.progress?.is_completed,
      "Wheel of Life": lifeElements?.progress?.is_completed,
      // Only boolean once Card Game state has actually been fetched
      "Card Game":
        cardPhase == null ? undefined : cardPhase === "completed",
      "Goal Settings": isGoalSettingsCompleted(goalsettingsContent),
      "Habit Tracker": isHabitTrackerCompleted(habbitContent),
    };

    TRACKED_COMPLETION_TITLES.forEach((title) => {
      const curr = currentCompletion[title];
      // Module not loaded yet — don't overwrite a prior false/true with undefined
      if (typeof curr !== "boolean") return;

      const wasIncomplete = prevCompletionRef.current[title] === false;
      const isNowComplete = curr === true;
      if (wasIncomplete && isNowComplete) {
        handleModuleCompleted(title);
      }

      prevCompletionRef.current[title] = curr;
    });
  }, [
    valuesContent?.progress?.is_completed,
    motivationContent?.progress?.is_completed,
    whoAmIContent?.progress?.is_completed,
    lifeElements?.progress?.is_completed,
    cardGamestate?.navigation?.current_phase,
    goalsettingsContent?.program_structure_id,
    goalsettingsContent?.progress?.is_completed,
    goalsettingsContent?.goals?.length,
    habbitContent?.program_structure_id,
    habbitContent?.progress?.is_completed,
    habbitContent?.habits?.length,
  ]);

  const completedFunction = (id) => {
    setCompleted([...completed, id]);
  };

  return (
    <>
      {modals.values && (
        <ValuesModal setModal={setModal} data={intermediateValuesContent} />
      )}
      {modals.commonMistakes && (
        <CommonMistakesModal setModal={setModal} data={intermediateMistakesContent} />
      )}
      {modals.goalSettings && (
        <GoalSettingsModal setModal={setModal} data={intermediateGoalSettingsContent} />
      )}
      {modals.theYMethod && (
        <TheYMethodModal setModal={setModal} data={intermediateYMethodContent} />
      )}
      {modals.eachGoal && (
        <QuestionForEachGoalModal setModal={setModal} data={intermediateQuestionsGoalWhyContent} />
      )}
      {modalIsopen && <WaitingModal setmodalIsopen={setmodalIsopen} />}
      {singleLoading && (
        <div className="dashboard_content_wrapper">
          <DashboardLoader />
        </div>
      )}
      {!singleLoading && (
        <div className="dashboard_content_wrapper">
          <div className="live_program_head_wrapper">
            <div className="live_program_head">
              <img onClick={() => navigate(-1)} src={arrow} />
              <h3>{singleProgramDetails?.name}</h3>
            </div>
            <div
              className="download_resources_wrapper"
              ref={resourcesDropdownRef}
            >
              <div
                className={`download_resources_head ${resourcesDropdownOpen ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setResourcesDropdownOpen((prev) => !prev);
                }}
              >
                <h3>Download Resources</h3>
                <img src={download} alt="download" />
                <img
                  src={down}
                  alt="toggle"
                  className={`download_resources_chevron ${resourcesDropdownOpen ? "open" : ""}`}
                />
              </div>

              {resourcesDropdownOpen && (
                <div className="download_resources_dropdown">
                  <div className="download_mode_tabs">
                    <button
                      type="button"
                      className={downloadMode === "all" ? "active" : ""}
                      onClick={() => setDownloadMode("all")}
                    >
                      Download All
                    </button>
                    <button
                      type="button"
                      className={downloadMode === "selective" ? "active" : ""}
                      onClick={() => setDownloadMode("selective")}
                    >
                      Selective Download
                    </button>
                  </div>

                  <div className="download_resources_list">
                    {resourcesloading && (
                      <p className="download_resources_empty">
                        Loading resources...
                      </p>
                    )}

                    {!resourcesloading && resourcesList.length <= 0 && (
                      <p className="download_resources_empty">
                        No resources available
                      </p>
                    )}

                    {!resourcesloading &&
                      resourcesList.map((resource, index) => {
                        const resourceId = getResourceId(resource, index);
                        const resourceName = getResourceName(resource, index);

                        return (
                          <div
                            key={resourceId}
                            className="download_resource_item"
                          >
                            {downloadMode === "selective" && (
                              <input
                                type="checkbox"
                                checked={selectedResources.includes(resourceId)}
                                onChange={() =>
                                  toggleResourceSelection(resourceId)
                                }
                              />
                            )}
                            <span className="download_resource_name">
                              {resourceName}
                            </span>
                            <button
                              type="button"
                              className="download_resource_btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadSingleResource(resource, index);
                              }}
                            >
                              <img src={download} alt="download" />
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  <div className="download_resources_footer">
                    {downloadMode === "all" ? (
                      <button
                        type="button"
                        className="download_resources_action_btn"
                      >
                        Download All Files
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="download_resources_action_btn"
                        disabled={selectedResources.length === 0}
                      >
                        Download Selected ({selectedResources.length})
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="live_program_video_wrapper">
            {!meetingReady ? (
              <p className="live_program_video_empty">Preparing meeting...</p>
            ) : canJoinZoom && profileData ? (
              <ZoomMeeting
                meetingData={meetingData}
                profile={{
                  profile: profileData?.name,
                  email: profileData?.email,
                }}
              />
            ) : (
              <p className="live_program_video_empty">
                Meeting credentials not found. Please join the session again
                from the schedule.
              </p>
            )}
          </div>

          <div className="live_program_modules_wrapper">
            <div className="live_program_modules_head">
              <h4>Program Modules</h4>
              <div
                className="down_img56"
                src={arrow}
                onClick={() => setmoduleOpen(!moduleOpen)}
              >
                <img src={down} />
              </div>
            </div>

            {moduleOpen && (
              <div className="program_tabs_wrapper">
                {allProgramModules?.length <= 0 && !loading && (
                  <p
                    style={{
                      textAlign: "center",
                      color: "var(--primary-color)",
                      fontWeight: "600",
                      gridColumn: "1/-1",
                    }}
                  >
                    No modules are available right now...
                  </p>
                )}
                {allProgramModules?.map((e) => {
                  if (
                    //!e?.module_type?.startsWith("intermediate") &&//
                    e?.title != "Upload Documents"
                  ) {
                    return (
                      <>
                        <div
                          key={e.sort_order}
                          style={
                            e.sort_order === id
                              ? { border: "2px solid var(--primary-color)" }
                              : {}
                          }
                          onClick={() => {
                            fetchLockUnlockDetails(
                              e?.program_structure_id,
                              e?.title,
                            );
                            setId(e.sort_order);
                          }}
                          className="program_tab"
                        >
                          {MODULE_ICONS[e?.title] && (
                            <img
                              src={MODULE_ICONS[e?.title] || frameIcon}
                              alt={e?.title}
                            />
                          )}
                          <p>{e.title}</p>
                          {isModuleCompleted(e) && (
                            <img style={tickStyle} src={tick} alt="completed" />
                          )}
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            )}

            {tabs.values && !valuesContent?.progress?.is_completed && (
              <ValuesContent
                fetchValuesQuestion={fetchValuesQuestion}
                valuesContent={valuesContent}
                questionLoading={loading}
                completedFunction={completedFunction}
              />
            )}
            {tabs.cardGame && !loading && (
              <CardGameContent
                setCardGamestate={setCardGamestate}
                cardGamestate={cardGamestate}
                completedFunction={completedFunction}
              />
            )}
            {tabs.wheel && !isWheelOfLifeCompleted && (
              <WheelLife
                lifeElements={lifeElements}
                markWheelOfLifeCompleted={markWheelOfLifeCompleted}
                completedFunction={completedFunction}
              />
            )}
            {tabs.goal && (
              <GoalSetting
                setgoalSettingsContent={setGoalSettingsNormalized}
                goalsettingsContent={goalsettingsContent}
                completedFunction={completedFunction}
              />
            )}
            {tabs.motivation && !motivationContent?.progress?.is_completed && (
              <FindMotivation
                fetchMotivation={fetchMotivation}
                motivationContent={motivationContent}
                completedFunction={completedFunction}
              />
            )}
            {tabs.whoAmI && !whoAmIContent?.progress?.is_completed && (
              <WhoAmI
                questionLoading={loading}
                fetchWhoamIQuestion={fetchWhoamIQuestion}
                whoAmIContent={whoAmIContent}
                completedFunction={completedFunction}
              />
            )}
            {tabs.habit && (
              <HabitTracker
                sethabbitContent={setHabitContentNormalized}
                habbitContent={habbitContent}
              />
            )}

            {loading && (
              <div
                style={{
                  height: "20vh",
                  position: "relative",
                }}
              >
                <DashboardLoader />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LiveProgram;
