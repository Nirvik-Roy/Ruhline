import React, { useCallback, useRef, useState } from "react";
import "./DashboardHabit.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  getHabitsCalendar,
  getHabitDateDetails,
  logCustomerHabit,
} from "../../../utils/program";
import DashboardLoader from "../../../Components/Loaders/DashboardLoader.jsx";
import HabitNotificationModal from "../../../Components/Modal/HabitNotificationModal.jsx";

const STATUS_EVENT_CLASS = {
  upcoming: "hcalx91_evt_upcoming",
  completed: "hcalx91_evt_completed",
  partially_completed: "hcalx91_evt_partial",
  not_completed: "hcalx91_evt_not_complete",
};

const mapHabitStatusToEventClass = (status) =>
  STATUS_EVENT_CLASS[status] || "hcalx91_evt_upcoming";

const mapLoggedStatusToNotifStatus = (habitStatus) => {
  if (habitStatus === "completed") return "success";
  if (habitStatus === "partially_completed") return "warning";
  if (habitStatus === "not_completed") return "error";
  return "success";
};

const buildLoggedStatusDescription = (detail) => {
  if (detail?.target_text) return detail.target_text;
  const completed = detail?.completed_count;
  const target = detail?.target_count;
  if (completed != null && target != null) {
    return `Logged ${completed} of ${target}`;
  }
  return "";
};

const isHabitUpcomingForLog = (detail) =>
  detail?.status === "upcoming" && detail?.log_id == null;

export const mapHabitsCalendarToEvents = (calendarData) => {
  const days = calendarData?.days;
  if (!Array.isArray(days)) return [];

  return days.flatMap((day) =>
    (day.habits || []).map((habit) => ({
      id: `${day.date}-${habit.habit_id}-${habit.log_id ?? "none"}`,
      title: habit.habit_name || "Habit",
      date: day.date,
      className: mapHabitStatusToEventClass(habit.status),
      extendedProps: {
        status: habit.status,
        habit,
        day,
      },
    })),
  );
};

const HabitCalendar = () => {
  const calendarRef = useRef(null);
  const lastFetchKeyRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [habitDateDetail, setHabitDateDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("reminder");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalStatus, setModalStatus] = useState("success");
  const [completionValue, setCompletionValue] = useState(null);
  const [logSubmitting, setLogSubmitting] = useState(false);

  const loadCalendarMonth = useCallback(async (month, year) => {
    const fetchKey = `${year}-${month}`;
    if (lastFetchKeyRef.current === fetchKey) return;

    lastFetchKeyRef.current = fetchKey;
    setLoading(true);

    const res = await getHabitsCalendar(month, year);
    if (res?.success) {
      setEvents(mapHabitsCalendarToEvents(res.data));
    } else {
      lastFetchKeyRef.current = null;
      setEvents([]);
    }

    setLoading(false);
  }, []);

  const refreshVisibleMonth = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    lastFetchKeyRef.current = null;
    const active = api.view.currentStart;
    loadCalendarMonth(active.getMonth() + 1, active.getFullYear());
  }, [loadCalendarMonth]);

  const resetModal = useCallback(() => {
    setModalOpen(false);
    setModalType("reminder");
    setModalTitle("");
    setModalDescription("");
    setModalStatus("success");
    setHabitDateDetail(null);
    setCompletionValue(null);
    setLogSubmitting(false);
  }, []);

  const openModalForDetail = useCallback((detail) => {
    const title = detail.habit_name || "Habit";
    const targetText = detail.target_text || "";

    if (!isHabitUpcomingForLog(detail)) {
      setModalType("status");
      setModalStatus(mapLoggedStatusToNotifStatus(detail.status));
      setModalTitle(title);
      setModalDescription(buildLoggedStatusDescription(detail));
      setModalOpen(true);
      return;
    }

    setModalType("reminder");
    setModalStatus("success");
    setModalTitle(title);
    setModalDescription(targetText);
    setModalOpen(true);
  }, []);

  const handleEventClick = useCallback(
    async (info) => {
      const habitId = info.event.extendedProps?.habit?.habit_id;
      const date =
        info.event.extendedProps?.day?.date || info.event.startStr?.slice(0, 10);

      if (!habitId || !date) return;

      setModalOpen(false);
      setHabitDateDetail(null);
      setDetailLoading(true);

      const res = await getHabitDateDetails(habitId, date);
      setDetailLoading(false);

      if (!res?.success || !res.data) return;

      setHabitDateDetail(res.data);
      openModalForDetail(res.data);
    },
    [openModalForDetail],
  );

  const handleMarkComplete = useCallback(() => {
    setCompletionValue(null);
    setModalType("completion");
  }, []);

  const handleCompletionChange = useCallback(
    async (level) => {
      if (!habitDateDetail || logSubmitting) return;

      const habitId = habitDateDetail.habit_id;
      const targetCount = habitDateDetail.target_count ?? 0;
      const isFull = level === "full";

      setCompletionValue(level);
      setLogSubmitting(true);

      const body = {
        log_date: habitDateDetail.date,
        status: isFull ? "completed" : "partially_completed",
        completed_count: isFull
          ? targetCount
          : Math.max(0, targetCount - 1),
        notes: "",
      };

      const res = await logCustomerHabit(habitId, body);
      setLogSubmitting(false);

      if (!res?.success) return;

      setModalType("status");
      setModalStatus("success");
      setModalTitle(habitDateDetail.habit_name || "Habit");
      setModalDescription(res.message || "Habit logged successfully");

      refreshVisibleMonth();
    },
    [habitDateDetail, logSubmitting, refreshVisibleMonth],
  );

  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    api.prev();
    setCurrentTitle(api.view.title);
  };

  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    api.next();
    setCurrentTitle(api.view.title);
  };

  const handleDatesSet = (arg) => {
    setCurrentTitle(arg.view.title);
    const active = arg.view.currentStart;
    loadCalendarMonth(active.getMonth() + 1, active.getFullYear());
  };

  return (
    <section className="hcalx91_calendar_page_shell">
      <div className="hcalx91_calendar_card_wrap">
        <div className="hcalx91_calendar_topbar">
          <div className="hcalx91_calendar_legend_wrap">
            <div className="hcalx91_legend_item">
              <span className="hcalx91_legend_color hcalx91_legend_upcoming"></span>
              <span>Upcoming</span>
            </div>

            <div className="hcalx91_legend_item">
              <span className="hcalx91_legend_color hcalx91_legend_completed"></span>
              <span>Completed</span>
            </div>

            <div className="hcalx91_legend_item">
              <span className="hcalx91_legend_color hcalx91_legend_partial"></span>
              <span>Partially Complete</span>
            </div>

            <div className="hcalx91_legend_item">
              <span className="hcalx91_legend_color hcalx91_legend_not_complete"></span>
              <span>Not Complete</span>
            </div>
          </div>
        </div>

        <div className="hcalx91_calendar_header_nav">
          <button
            type="button"
            className="hcalx91_nav_btn_circle"
            onClick={handlePrev}
            disabled={loading}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <h2 className="hcalx91_calendar_title">{currentTitle}</h2>

          <button
            type="button"
            className="hcalx91_nav_btn_circle"
            onClick={handleNext}
            disabled={loading}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div
          className="hcalx91_calendar_main_wrap"
          style={{ position: "relative", minHeight: "420px" }}
        >
          {(loading || detailLoading) && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                background: "rgba(250, 249, 246, 0.75)",
              }}
            >
              <DashboardLoader />
            </div>
          )}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={false}
            fixedWeekCount={false}
            showNonCurrentDates={true}
            dayMaxEvents={false}
            events={events}
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
          />
        </div>
      </div>

      <HabitNotificationModal
        open={modalOpen}
        type={modalType}
        title={modalTitle}
        description={modalDescription}
        status={modalStatus}
        completionValue={completionValue}
        onCompletionChange={handleCompletionChange}
        onMarkComplete={handleMarkComplete}
        onClose={resetModal}
        completionDisabled={logSubmitting}
      />
    </section>
  );
};

export default HabitCalendar;
