import React from "react";
import "../../styles/Dashboard.css";

const GoogleCalendar = () => {
  return (
    <div>
      <iframe
        className="google-calendar"
        src="https://calendar.google.com/calendar/embed?src=a20fdc0a6f9b690454e765636dd4655c645b2882817495f284acd0ddf5047fc9%40group.calendar.google.com&ctz=Europe%2FWarsaw"
        title="Google Calendar"
      ></iframe>
    </div>
  );
};

export default GoogleCalendar;
