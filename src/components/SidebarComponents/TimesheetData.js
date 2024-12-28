import React, { useState, useEffect } from "react";
import AddTimesheet from "./AddTimesheet";
import deleteTimesheetButton from "../SidebarComponents/DeleteTimesheetButton";

function TimesheetData() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [workLog, setWorkLog] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("authToken"); // Pobieranie tokena z localStorage

  // Pobranie listy pracowników
  useEffect(() => {
    fetch("Employees/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie tokena w nagłówku
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) =>
        console.error("Błąd przy pobieraniu pracowników:", error)
      );
  }, [token]);

  // Pobranie timesheetów dla wybranego pracownika
  useEffect(() => {
    if (selectedEmployeeId) {
      setIsLoading(true);
      setError(null);

      fetch(`/Employees/${selectedEmployeeId}/Timesheets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Dodanie tokena w nagłówku
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data || Object.keys(data).length === 0) {
            console.warn("Brak danych dla wybranego pracownika.");
            setWorkLog([]);
          } else {
            setWorkLog(data);
          }
        })
        .catch((error) => {
          console.error("Błąd przy pobieraniu ewidencji czasu pracy:", error);
          setError("Nie udało się pobrać danych. Spróbuj ponownie.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setWorkLog(null);
    }
  }, [selectedEmployeeId, token]);

  // Usuwanie timesheetu i odświeżanie listy
  const handleDelete = (index) => {
    if (
      !selectedEmployeeId ||
      !workLog ||
      index < 0 ||
      index >= workLog.length
    ) {
      console.error("Nieprawidłowe dane do usunięcia.");
      return;
    }

    const timesheetId = workLog[index]?.id;

    deleteTimesheetButton(selectedEmployeeId, timesheetId)
      .then(() => {
        console.log(`Timesheet o ID ${timesheetId} został usunięty.`);
        // Po usunięciu odśwież listę timesheetów
        fetch(`/Employees/${selectedEmployeeId}/Timesheets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Dodanie tokena w nagłówku
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setWorkLog(data || []); // Aktualizujemy stan
          })
          .catch((error) => {
            console.error("Błąd przy ponownym pobieraniu ewidencji:", error);
            setError("Nie udało się odświeżyć danych. Spróbuj ponownie.");
          });
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania:", error);
        setError("Nie udało się usunąć wpisu. Spróbuj ponownie.");
      });
  };

  // Dodanie nowego timesheetu
  const addTimesheet = (newTimesheet) => {
    setWorkLog((prevLogs) => [...prevLogs, newTimesheet]);
  };

  return (
    <div>
      <select
        onChange={(e) => setSelectedEmployeeId(parseInt(e.target.value, 10))}
        defaultValue=""
      >
        <option value="" disabled>
          {employees.length === 0
            ? "Brak dostępnych pracowników"
            : "Wybierz pracownika..."}
        </option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName}
          </option>
        ))}
      </select>

      {selectedEmployeeId && (
        <div>
          {selectedEmployeeId && (
            <AddTimesheet
              selectedEmployeeId={selectedEmployeeId}
              onAddTimesheet={addTimesheet}
            />
          )}
          {isLoading ? (
            <p className="message loading">Ładowanie danych...</p>
          ) : error ? (
            <p className="message error">{error}</p>
          ) : workLog && workLog.length > 0 ? (
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
                      <button onClick={() => handleDelete(index)}>Usuń</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="message">Brak danych do wyświetlenia.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TimesheetData;
