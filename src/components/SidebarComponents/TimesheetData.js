import React, { useState, useEffect } from "react";
// import AddTimesheet from "./AddTimesheet";

function TimesheetData() {
  const [employees, setEmployees] = useState([]); // Lista pracowników
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // Wybrany ID pracownika
  const [workLog, setWorkLog] = useState(null); // Dane ewidencji czasu pracy

  // Pobieranie listy pracowników
  useEffect(() => {
    fetch("Employees/getAll") // Podmień na właściwy endpoint
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) =>
        console.error("Błąd przy pobieraniu pracowników:", error)
      );
  }, []);

  // Pobieranie ewidencji czasu pracy po wybraniu pracownika
  useEffect(() => {
    if (selectedEmployeeId) {
      fetch(`/Timesheet/get/${selectedEmployeeId}`) // Podmień na właściwy endpoint
        .then((response) => response.json())
        .then((data) => setWorkLog(data))
        .catch((error) =>
          console.error("Błąd przy pobieraniu ewidencji czasu pracy:", error)
        );
    }
  }, [selectedEmployeeId]);

  return (
    <div>
      <select
        onChange={(e) => setSelectedEmployeeId(parseInt(e.target.value, 10))}
        defaultValue="" // Domyślny wybór (pusta opcja)
      >
        <option value="" disabled>
          Wybierz pracownika...
        </option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName}
          </option>
        ))}
      </select>

      {selectedEmployeeId && (
        <div>
          {workLog ? (
            <table className="invoicesTables1">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Czas pracy</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workLog.map((log, index) => (
                  <tr key={index}>
                    <td>
                      {log.date
                        ? new Date(log.date).toLocaleDateString()
                        : "Brak danych"}
                    </td>
                    <td>{log.timeOfWorking}</td>
                    <td>
                      <button>Usuń</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Brak danych do wyświetlenia.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TimesheetData;
