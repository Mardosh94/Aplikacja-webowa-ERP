import React, { useState, useEffect } from "react";

const EditEmployeeModal = ({ employee, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    city: "",
    postCode: "",
    street: "",
    buildingNumber: "",
  });

  // Inicjalizacja danych w formularzu przy otwarciu modalu
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        dateOfBirth: employee.dateOfBirth,
        city: employee.address.city,
        postCode: employee.address.postCode,
        street: employee.address.street,
        buildingNumber: employee.address.buildingNumber,
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      id: employee.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      address: {
        city: formData.city,
        postCode: formData.postCode,
        street: formData.street,
        buildingNumber: formData.buildingNumber,
      },
    };

    onSave(updatedEmployee); // Zapisz zaktualizowanego pracownika
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edycja pracownika</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Imię"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Nazwisko"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Numer telefonu"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            placeholder="Data urodzenia"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Miasto"
            required
          />
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleInputChange}
            placeholder="Kod pocztowy"
            required
          />
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            placeholder="Ulica"
            required
          />
          <input
            type="text"
            name="buildingNumber"
            value={formData.buildingNumber}
            onChange={handleInputChange}
            placeholder="Numer budynku"
            required
          />
          <button type="submit">Zapisz</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
