import React, { useState, useEffect } from "react";

const EditCustomerModal = ({ customer, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    postCode: "",
    street: "",
    buildingNumber: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        companyName: customer.companyName,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        city: customer.address.city,
        postCode: customer.address.postCode,
        street: customer.address.street,
        buildingNumber: customer.address.buildingNumber,
      });
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCustomer = {
      id: customer.id,
      companyName: formData.companyName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: {
        city: formData.city,
        postCode: formData.postCode,
        street: formData.street,
        buildingNumber: formData.buildingNumber,
      },
    };

    onSave(updatedCustomer);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edycja kontrahenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Firma"
            required
          />
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

export default EditCustomerModal;
