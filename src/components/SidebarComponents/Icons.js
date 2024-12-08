import React from "react";
import "../../styles/Icons.css";
import calendarIcon from "../../styles/assets/calendar.svg";
import budgetIcon from "../../styles/assets/budget.svg";
import contactIcon from "../../styles/assets/contact.svg";
import costsIcon from "../../styles/assets/costs.svg";
import dataIcon from "../../styles/assets/data.svg";
import groupIcon from "../../styles/assets/group.svg";
import listIcon from "../../styles/assets/list.svg";
import raportsIcon from "../../styles/assets/raports.svg";
import timerIcon from "../../styles/assets/timer.svg";

const iconMap = {
  KALENDARZ: calendarIcon,
  "LISTA OBECNOŚCI": timerIcon,
  "LISTA ZLECEŃ": listIcon,
  FAKTURY: costsIcon,
  BUDŻET: budgetIcon,
  "DANE PRACOWNIKÓW": dataIcon,
  RAPORTY: raportsIcon,
  KONTAKT: contactIcon,
  GRUPY: groupIcon,
};

const Icons = ({ text, isActive, onClick }) => {
  const icon = iconMap[text];

  return (
    <div
      className={`sidebar-icon ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={icon} alt="Ikona" />
      <span>{text}</span>
    </div>
  );
};

export default Icons;
