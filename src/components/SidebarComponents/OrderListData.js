import React, { useState, useEffect } from "react";
import deleteOrderEntry from "../SidebarComponents/DeleteOrderButton";
import AddOrder from "./AddOrder";

function OrderListData() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("/Customers/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCustomers(data || []))
      .catch((error) => {
        console.error("Błąd przy pobieraniu pracowników:", error);
        setError("Nie udało się załadować listy kontrahentów.");
      });
  }, [token]);

  useEffect(() => {
    if (!selectedCustomerId) {
      setOrders([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`/Customers/${selectedCustomerId}/Orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data || []);
      })
      .catch((error) => {
        console.error("Błąd przy pobieraniu listy zamówień:", error);
        setError("Nie udało się pobrać danych zamówień.");
      })
      .finally(() => setIsLoading(false));
  }, [selectedCustomerId, token]);

  const handleDelete = (index) => {
    if (!selectedCustomerId || !orders || index < 0 || index >= orders.length) {
      console.error("Nieprawidłowe dane do usunięcia.");
      return;
    }

    const orderId = orders[index]?.id;

    deleteOrderEntry(selectedCustomerId, orderId)
      .then(() => {
        console.log(`Zamówienie o ID ${orderId} zostało usunięte.`);
        fetch(`/Customers/${selectedCustomerId}/Orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setOrders(data || []);
          })
          .catch((error) => {
            console.error("Błąd przy ponownym pobieraniu danych:", error);
            setError("Nie udało się odświeżyć danych zamówień.");
          });
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania:", error);
        setError("Nie udało się usunąć zamówienia.");
      });
  };

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <div>
      <select
        onChange={(e) => setSelectedCustomerId(parseInt(e.target.value, 10))}
        defaultValue=""
      >
        <option value="" disabled>
          {customers.length === 0
            ? "Brak dostępnych kontrahentów"
            : "Wybierz kontrahenta..."}
        </option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.companyName} {customer.firstName} {customer.lastName}
          </option>
        ))}
      </select>

      {selectedCustomerId && (
        <div>
          <AddOrder
            selectedCustomerId={selectedCustomerId}
            onAddOrder={addOrder}
          />
          <h2>Lista zamówień</h2>
          {isLoading ? (
            <p className="message loading">Ładowanie danych...</p>
          ) : error ? (
            <p className="message error">{error}</p>
          ) : orders && orders.length > 0 ? (
            <table className="invoicesTables1">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Opis</th>
                  <th style={{ width: 20 }}>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "Brak danych"}
                    </td>
                    <td>{order.description}</td>
                    <td>
                      <button onClick={() => handleDelete(index)}>Usuń</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="message">Brak danych do wyświetlenia.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderListData;
