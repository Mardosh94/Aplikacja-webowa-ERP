import React, { useState, useEffect } from "react";
import AddTimesheet from "./AddTimesheet";
import deleteTimesheetButton from "../SidebarComponents/DeleteTimesheetButton";

function TimesheetData() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [workLog, setWorkLog] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHours, setTotalHours] = useState(0);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("Employees/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) =>
        console.error("Błąd przy ponownym pobieraniu ewidencji:", error)
      );
  }, [token]);

  // Fetching timesheets for the selected employee
  useEffect(() => {
    if (selectedEmployeeId) {
      setIsLoading(true);
      setError(null);

      fetch(`/Employees/${selectedEmployeeId}/Timesheets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data || data.length === 0) {
            console.warn("Brak ewidencji pracy dla pracownika.");
            setWorkLog([]);
            setTotalHours(0);
          } else {
            setWorkLog(data);
            calculateTotalHours(data);
          }
        })
        .catch((error) => {
          console.error("Nie udało sie pobrać danych:", error);
          setError("Błąd podczas pobieroania danych.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setWorkLog([]);
      setTotalHours(0);
    }
  }, [selectedEmployeeId, token]);

  // Calculate total hours worked from the timesheet
  const calculateTotalHours = (timesheets) => {
    const total = timesheets.reduce(
      (sum, timesheet) => sum + parseFloat(timesheet.timeOfWorking || 0),
      0
    );
    setTotalHours(total); // Update total hours
  };

  // Handle delete timesheet and refresh list
  const handleDelete = (index) => {
    if (!selectedEmployeeId || index < 0 || index >= workLog.length) {
      console.error("błęden dane.");
      return;
    }

    const timesheetId = workLog[index]?.id;

    deleteTimesheetButton(selectedEmployeeId, timesheetId).then(() => {
      console.log(`Timesheet with ID ${timesheetId} deleted.`);
      fetch(`/Employees/${selectedEmployeeId}/Timesheets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setWorkLog(data || []);
          calculateTotalHours(data);
        })
        .catch((error) => {
          console.error("Błąd odświeżania:", error);
          setError("Błąd odświeżania po usunięciu wpisu.");
        });
    });
  };

  // Add a new timesheet
  const addTimesheet = (newTimesheet) => {
    setWorkLog((prevLogs) => {
      const updatedLogs = [...prevLogs, newTimesheet];
      calculateTotalHours(updatedLogs);
      return updatedLogs;
    });
  };

  return (
    <div>
      <h1>Lista obecności</h1>
      <select
        onChange={(e) => setSelectedEmployeeId(parseInt(e.target.value, 10))}
        defaultValue=""
      >
        <option value="" disabled>
          {employees.length === 0
            ? "Brak pracowników"
            : "Wybierz pracwonika..."}
        </option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName}
          </option>
        ))}
      </select>

      {selectedEmployeeId && (
        <div>
          <AddTimesheet
            selectedEmployeeId={selectedEmployeeId}
            onAddTimesheet={addTimesheet}
          />
          <h2>Ewidencja czasu pracy pracownika</h2>
          {isLoading ? (
            <p className="message loading">Ładownie danych...</p>
          ) : error ? (
            <p className="message error">{error}</p>
          ) : workLog && workLog.length > 0 ? (
            <>
              <table className="invoicesTables1">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Czas pracy [godziny]</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {workLog.map((log, index) => (
                    <tr key={index}>
                      <td>
                        {log.date
                          ? new Date(log.date).toLocaleDateString()
                          : "No data"}
                      </td>
                      <td>{log.timeOfWorking}</td>
                      <td>
                        <button onClick={() => handleDelete(index)}>
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="message">Brak danych do wyświetlenia.</p>
          )}
        </div>
      )}

      <h2>
        <td>
          <div className="total-hours">
            <p>Łączny czas pracy: {totalHours} godzin</p>
          </div>
        </td>
      </h2>
    </div>
  );
}

export default TimesheetData;
