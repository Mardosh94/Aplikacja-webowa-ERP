import React, { useState } from "react";
import "../../styles/Dashboard.css";

const AddEmployee = ({ onAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: {
      city: "",
      postCode: "",
      street: "",
      buildingNumber: "",
    },
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Obsługa adresu jako obiektu
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setNewEmployee((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setNewEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Usuwamy błąd, gdy użytkownik zaczyna wprowadzać poprawne dane
    setError("");
  };

  const handleAddEmployee = () => {
    // Walidacja danych
    if (
      !newEmployee.firstName ||
      !newEmployee.lastName ||
      !newEmployee.email ||
      !newEmployee.phoneNumber ||
      !newEmployee.dateOfBirth ||
      !newEmployee.address.city ||
      !newEmployee.address.postCode ||
      !newEmployee.address.street ||
      !newEmployee.address.buildingNumber
    ) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    onAddEmployee(newEmployee);

    // Resetujemy formularz po udanym dodaniu
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: {
        city: "",
        postCode: "",
        street: "",
        buildingNumber: "",
      },
    });

    setError("");
  };

  return (
    <div className="add-employee">
      <h2>Dodaj nowego pracownika</h2>
      <div className="input-row">
        <input
          type="text"
          name="firstName"
          value={newEmployee.firstName}
          onChange={handleChange}
          placeholder="Imię"
        />
        <input
          type="text"
          name="lastName"
          value={newEmployee.lastName}
          onChange={handleChange}
          placeholder="Nazwisko"
        />
        <input
          type="email"
          name="email"
          value={newEmployee.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phoneNumber"
          value={newEmployee.phoneNumber}
          onChange={handleChange}
          placeholder="numer telefonu"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={newEmployee.dateOfBirth}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.city"
          value={newEmployee.address.city}
          onChange={handleChange}
          placeholder="Miasto"
        />
        <input
          type="text"
          name="address.postCode"
          value={newEmployee.address.postCode}
          onChange={handleChange}
          placeholder="Kod pocztowy"
        />
        <input
          type="text"
          name="address.street"
          value={newEmployee.address.street}
          onChange={handleChange}
          placeholder="Ulica"
        />
        <input
          type="text"
          name="address.buildingNumber"
          value={newEmployee.address.buildingNumber}
          onChange={handleChange}
          placeholder="Numer budynku"
        />
        <button onClick={handleAddEmployee}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddEmployee;
