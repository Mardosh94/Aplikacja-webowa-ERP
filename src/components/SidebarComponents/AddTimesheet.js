import React, { useState } from "react";
import "../../styles/Dashboard.css";

const AddTimesheet = ({ onAddTimesheet }) => {
  const [newTimesheet, setNewTimesheet] = useState({
    date: "",
    timeofworking: "",
  });

  const [error, setError] = useState("");

  // Obsługa zmian w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTimesheet((prevState) => ({
      ...prevState,
      [name]: value, // Dynamiczne przypisanie wartości na podstawie nazwy pola
    }));
  };

  // Obsługa dodania ewidencji czasu pracy
  const handleAddTimesheet = () => {
    // Walidacja danych
    if (!newTimesheet.date || !newTimesheet.timeofworking) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    // Wywołanie funkcji przekazanej przez props (np. do dodania danych w stanie rodzica)
    onAddTimesheet(newTimesheet);

    // Resetujemy formularz po udanym dodaniu
    setNewTimesheet({
      date: "",
      timeofworking: "",
    });

    setError("");
  };

  return (
    <div className="add-employee">
      <h2>Dodaj czas pracy</h2>
      <div className="input-row">
        <input
          type="date"
          name="date" // Dopasowano nazwę do stanu
          value={newTimesheet.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="timeofworking" // Dopasowano nazwę do stanu
          value={newTimesheet.timeofworking}
          onChange={handleChange}
          placeholder="czas pracy"
        />
        <button onClick={handleAddTimesheet}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddTimesheet;
