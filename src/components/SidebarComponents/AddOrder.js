import React, { useState } from "react";
import "../../styles/Dashboard.css";

const AddOrder = ({ selectedCusotmerId, onAddOrder }) => {
  const [newOrder, setNewOrder] = useState({
    orderDate: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "timeOfWorking") {
      const parsedValue = parseFloat(value);
      setNewOrder((prevState) => ({
        ...prevState,
        [name]: isNaN(parsedValue) ? "" : parsedValue,
      }));
    } else {
      setNewOrder((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddOrder = async () => {
    if (!newOrder.orderDate || !newOrder.description) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    try {
      const response = await fetch(`/Customers/${selectedCusotmerId}/Oreders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      console.log(newOrder);
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
          setNewOrder({ date: "", orderDate: "", status: "" });
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
    <div className="add-customer">
      <h2>Dodaj zlecenie</h2>
      <div className="input-row">
        <input
          type="date"
          name="date"
          value={newOrder.OrderDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={newOrder.description}
          onChange={handleChange}
          placeholder="Opis"
          step="0.1"
        />
        <button onClick={handleAddOrder}>Dodaj</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddOrder;
