import React from "react";
import "../../styles/Dashboard.css";

const Timesheet = ({ name, timesheetData }) => (
  <div className="timesheet">
    <h1>Lista obecności {name ? name : "Wybierz imię z listy"}</h1>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Liczba godzin</th>
        </tr>
      </thead>
      <tbody>
        {timesheetData.map((entry, index) => (
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.timeOfWorking}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Timesheet;
