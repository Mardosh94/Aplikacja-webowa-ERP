import "../styles/Dashboard.css";

const Timesheet = ({ name, dateTime, hourIn, hourOut, hours }) => (
  <div className="timesheet">
    <h1>Lista obecności {name ? name : "Wybierz imię z listy"}</h1>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Godzina wejścia</th>
          <th>Godzina wyjścia</th>
          <th>Liczba godzin</th>
        </tr>
      </thead>
      <tbody style={{ color: "red" }}>
        <tr>
          <td>{dateTime}</td>
          <td>{hourIn}</td>
          <td>{hourOut}</td>
          <td>{hours}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Timesheet;
