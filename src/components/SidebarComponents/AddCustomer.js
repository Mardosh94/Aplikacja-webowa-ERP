import React, { useState } from "react";
import "../../styles/Dashboard.css";

const AddCustomer = ({ onAddCustomer }) => {
  const [newCustomer, setNewCustomer] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setNewCustomer((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setNewCustomer((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError("");
  };

  const handleAddCustomer = () => {
    if (
      !newCustomer.firstName ||
      !newCustomer.lastName ||
      !newCustomer.email ||
      !newCustomer.phoneNumber ||
      !newCustomer.address.city ||
      !newCustomer.address.postCode ||
      !newCustomer.address.street ||
      !newCustomer.address.buildingNumber
    ) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    onAddCustomer(newCustomer);

    setNewCustomer({
      companyName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
    <div className="add-customer">
      <h2>Dodaj nowego kontrahenta</h2>
      <div className="input-row">
        <input
          type="text"
          name="companyName"
          value={newCustomer.companyNameName}
          onChange={handleChange}
          placeholder="Firma"
        />
        <input
          type="text"
          name="firstName"
          value={newCustomer.firstName}
          onChange={handleChange}
          placeholder="Imię"
        />
        <input
          type="text"
          name="lastName"
          value={newCustomer.lastName}
          onChange={handleChange}
          placeholder="Nazwisko"
        />
        <input
          type="email"
          name="email"
          value={newCustomer.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phoneNumber"
          value={newCustomer.phoneNumber}
          onChange={handleChange}
          placeholder="numer telefonu"
        />
        <input
          type="text"
          name="address.city"
          value={newCustomer.address.city}
          onChange={handleChange}
          placeholder="Miasto"
        />
        <input
          type="text"
          name="address.postCode"
          value={newCustomer.address.postCode}
          onChange={handleChange}
          placeholder="Kod pocztowy"
        />
        <input
          type="text"
          name="address.street"
          value={newCustomer.address.street}
          onChange={handleChange}
          placeholder="Ulica"
        />
        <input
          type="text"
          name="address.buildingNumber"
          value={newCustomer.address.buildingNumber}
          onChange={handleChange}
          placeholder="Numer budynku"
        />
        <button onClick={handleAddCustomer}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddCustomer;
