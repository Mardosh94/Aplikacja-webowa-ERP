import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";
import AddCustomer from "./AddCustomer";
import EditCustomerModal from "./EditCustomerModal";

const CustomerData = () => {
  const [customerData, setCustomer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  const token = localStorage.getItem("authToken"); // Pobranie tokena z localStorage

  const fetchCustomers = () => {
    fetch(`/Customers/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówka Authorization
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  };

  useEffect(() => {
    fetchCustomers();
  });

  const handleDeleteCustomer = (id) => {
    fetch(`/Customers/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówka Authorization
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas usuwania kontrahenta");
        }
        setCustomer((prev) => prev.filter((customer) => customer.id !== id));
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania kontrahenta:", error);
      });
  };

  const handleEditCustomer = (customer) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const handleAddNewCustomer = (newCustomer) => {
    fetch(`/Customers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówka Authorization
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        throw new Error("Błąd podczas dodawania kontrahenta");
      })
      .then((createdCustomer) => {
        setCustomer((prev) => [...prev, createdCustomer]);
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania kontrahenta:", error);
      });
  };

  const handleSaveEditedCustomer = (editedCustomer) => {
    const token = localStorage.getItem("authToken"); // Pobranie tokena z localStorage

    fetch(`/Customers/update?id=${editedCustomer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówka Authorization
      },
      body: JSON.stringify({
        companyName: editedCustomer.companyName,
        firstName: editedCustomer.firstName,
        lastName: editedCustomer.lastName,
        email: editedCustomer.email,
        phoneNumber: editedCustomer.phoneNumber,
        dateOfBirth: editedCustomer.dateOfBirth,
        address: editedCustomer.address,
      }),
    })
      .then((response) => {
        console.log(
          JSON.stringify({
            companyName: editedCustomer.companyName,
            firstName: editedCustomer.firstName,
            lastName: editedCustomer.lastName,
            email: editedCustomer.email,
            phoneNumber: editedCustomer.phoneNumber,
            dateOfBirth: editedCustomer.dateOfBirth,
            address: editedCustomer.address,
          })
        );
        if (!response.ok) {
          throw new Error("Błąd podczas zapisywania danych");
        }
        return response.json();
      })
      .then((updatedData) => {
        setCustomer((prev) =>
          prev.map((cus) =>
            cus.id === editedCustomer.id ? { ...cus, ...updatedData } : cus
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Błąd podczas zapisywania danych:", error);
      });
  };

  return (
    <div>
      <h1>Lista kontrahentów</h1>
      <AddCustomer onAddCustomer={handleAddNewCustomer} />
      <table className="customer-table">
        <thead>
          <tr>
            <th>Imię i Nazwisko</th>
            <th>Firma</th>
            <th>Email</th>
            <th>Numer telefonu</th>
            <th>Adres</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{`${customer.firstName} ${customer.lastName}`}</td>
              <td>{customer.companyName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>
                {customer.address
                  ? `${customer.address.city}, ${customer.address.postCode}, ${customer.address.street} ${customer.address.buildingNumber}`
                  : "Brak adresu"}
              </td>
              <td className="actions">
                <button onClick={() => handleEditCustomer(customer)}>
                  Edytuj
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <EditCustomerModal
          customer={customerToEdit}
          onSave={handleSaveEditedCustomer}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomerData;
