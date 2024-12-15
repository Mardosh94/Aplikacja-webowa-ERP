import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Podaj tytuł wydarzenia");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleEventSelect = (event) => {
    const newTitle = window.prompt("Edytuj tytuł wydarzenia", event.title);
    if (newTitle) {
      setEvents(
        events.map((ev) => (ev === event ? { ...ev, title: newTitle } : ev))
      );
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        views={["month", "week", "day"]}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
      />
    </div>
  );
};

export default MyCalendar;
