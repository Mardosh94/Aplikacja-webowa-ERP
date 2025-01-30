import React, { useState } from "react";
import "../../styles/Dashboard.css";

const token = localStorage.getItem("authToken");

const AddOrder = ({ selectedCustomerId, onAddOrder }) => {
  const [newOrder, setNewOrder] = useState({
    orderDate: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddOrder = async () => {
    if (!newOrder.orderDate || !newOrder.description) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    try {
      const response = await fetch(`/Customers/${selectedCustomerId}/Orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });

      console.log("Nowe zamówienie:", newOrder);

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
          onAddOrder(data);
          setNewOrder({ orderDate: "", description: "" });
          setError("");
        } else {
          setError(data.message || "Nie udało się dodać zamówienia.");
        }
      } else {
        const text = await response.text();
        console.log("Odpowiedź serwera (tekstowa):", text);
        setError(`Nieoczekiwana odpowiedź serwera: ${text}`);
      }
    } catch (err) {
      console.error("Błąd podczas dodawania zamówienia:", err);
      setError("Wystąpił błąd podczas dodawania zamówienia. Spróbuj ponownie.");
    }
  };

  return (
    <div className="add-customer">
      <h2>Dodaj zlecenie</h2>
      <div className="input-row">
        <input
          type="date"
          name="orderDate"
          value={newOrder.orderDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={newOrder.description}
          onChange={handleChange}
          placeholder="Opis"
        />
        <button onClick={handleAddOrder}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddOrder;
