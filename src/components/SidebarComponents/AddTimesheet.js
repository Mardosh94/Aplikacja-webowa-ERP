import React, { useState } from "react";
import "../../styles/Dashboard.css";

const AddTimesheet = ({ selectedEmployeeId, onAddTimesheet }) => {
  const [newTimesheet, setNewTimesheet] = useState({
    date: "",
    timeOfWorking: "",
  });

  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken"); // Pobieranie tokena z localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Walidacja pola timeOfWorking - upewnienie się, że to liczba
    if (name === "timeOfWorking") {
      const parsedValue = parseFloat(value);
      setNewTimesheet((prevState) => ({
        ...prevState,
        [name]: isNaN(parsedValue) || parsedValue < 0 ? "" : parsedValue,
      }));
    } else {
      setNewTimesheet((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddTimesheet = async () => {
    if (!newTimesheet.date || !newTimesheet.timeOfWorking) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    try {
      const response = await fetch(
        `/Employees/${selectedEmployeeId}/Timesheets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTimesheet),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Błąd serwera: ${response.status}. ${errorText}`);
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.status === 201) {
          onAddTimesheet(data); // Przekazanie danych do nadrzędnego komponentu
          setNewTimesheet({ date: "", timeOfWorking: "" }); // Reset formularza
          setError(""); // Reset błędu
        } else {
          setError(data.message || "Nie udało się dodać wpisu.");
        }
      } else {
        const text = await response.text();
        setError(`Odpowiedź serwera: ${text}`);
      }
    } catch (err) {
      setError("Wystąpił błąd podczas dodawania ewidencji czasu pracy.");
      console.error("Błąd podczas dodawania wpisu:", err);
    }
  };

  return (
    <div className="add-timesheet">
      <h2>Dodaj czas pracy</h2>
      <div className="input-row">
        <input
          type="date"
          name="date"
          value={newTimesheet.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="timeOfWorking"
          value={newTimesheet.timeOfWorking}
          onChange={handleChange}
          placeholder="Czas pracy"
          step="0.1"
          min="0" // Zapewnienie, że czas pracy nie będzie ujemny
          required
        />
        <button onClick={handleAddTimesheet}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddTimesheet;
