import React, { useState } from "react";
import "../../styles/Dashboard.css";

const AddTimesheet = ({ selectedEmployeeId, onAddTimesheet }) => {
  const [newTimesheet, setNewTimesheet] = useState({
    date: "",
    timeOfWorking: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "timeOfWorking") {
      const parsedValue = parseFloat(value);
      setNewTimesheet((prevState) => ({
        ...prevState,
        [name]: isNaN(parsedValue) ? "" : parsedValue,
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
      const response = await fetch(`/Timesheet/add/${selectedEmployeeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTimesheet),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Błąd serwera: ${response.status}. ${errorText}`);
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Odpowiedź serwera (JSON):", data);

        if (response.status === 201) {
          onAddTimesheet(data);
          setNewTimesheet({ date: "", timeOfWorking: "" });
          setError("");
        } else {
          setError(data.message || "Nie udało się dodać wpisu.");
        }
      } else {
        const text = await response.text();
        console.log("Odpowiedź serwera (tekstowa):", text);
        setError(`Odpowiedź serwera: ${text}`);
      }
    } catch (err) {
      console.error("Błąd podczas dodawania wpisu:", err);
      setError("Wystąpił błąd podczas dodawania ewidencji czasu pracy.");
    }
  };

  return (
    <div className="add-employee">
      <h2>Dodaj czas pracy</h2>
      <div className="input-row">
        <input
          type="date"
          name="date"
          value={newTimesheet.date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="timeOfWorking"
          value={newTimesheet.timeOfWorking}
          onChange={handleChange}
          placeholder="Czas pracy"
          step="0.1"
        />
        <button onClick={handleAddTimesheet}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddTimesheet;
