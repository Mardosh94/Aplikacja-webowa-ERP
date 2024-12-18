import React, { useState, useEffect } from "react";
import deleteTimesheetEntry from "../SidebarComponents/DeleteTimesheetButton";
import AddOrder from "./AddOrder";

function OrderListData() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [workLog, setWorkLog] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("Customers/getAll")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) =>
        console.error("Błąd przy pobieraniu kontrahentów:", error)
      );
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      setIsLoading(true);
      setError(null);

      fetch(`/Customers/${selectedCustomerId}/Orders`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data || Object.keys(data).length === 0) {
            console.warn("Brak danych dla wybranego kontrahenta.");
            setWorkLog([]);
          } else {
            setWorkLog(data);
          }
        })
        .catch((error) => {
          console.error("Błąd przy pobieraniu listy zamównień:", error);
          setError("Nie udało się pobrać danych. Spróbuj ponownie.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setWorkLog(null);
    }
  }, [selectedCustomerId]);

  const handleDelete = (index) => {
    if (
      !selectedCustomerId ||
      !workLog ||
      index < 0 ||
      index >= workLog.length
    ) {
      console.error("Nieprawidłowe dane do usunięcia.");
      return;
    }

    const orderId = workLog[index]?.id;

    deleteTimesheetEntry(selectedCustomerId, orderId)
      .then(() => {
        console.log(`Zamównienie o ID ${orderId} zostało usunięte.`);
        // Po usunięciu odśwież listę timesheetów
        fetch(`/Customers/${selectedCustomerId}/Orders`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setWorkLog(data || []);
          })
          .catch((error) => {
            console.error("Błąd przy ponownym pobieraniu ewidencji:", error);
            setError("Nie udało się odświeżyć danych. Spróbuj ponownie.");
          });
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania:", error);
        setError("Nie udało się usunąć wpisu. Spróbuj ponownie.");
      });
  };

  const addOrder = (newOrder) => {
    setWorkLog((prevLogs) => [...prevLogs, newOrder]);
  };

  return (
    <div>
      <select
        onChange={(e) => setSelectedCustomerId(parseInt(e.target.value, 10))}
        defaultValue=""
      >
        <option value="" disabled>
          {customers.length === 0
            ? "Brak dostępnych pracowników"
            : "Wybierz pracownika..."}
        </option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.companyName} {customer.firstName} {customer.lastName}
          </option>
        ))}
      </select>

      {selectedCustomerId && (
        <div>
          {selectedCustomerId && (
            <AddOrder
              selectedEmployeeId={selectedCustomerId}
              onAddTimesheet={addOrder}
            />
          )}
          {isLoading ? (
            <p className="message loading">Ładowanie danych...</p>
          ) : error ? (
            <p className="message error">{error}</p>
          ) : workLog && workLog.length > 0 ? (
            <table className="invoicesTables1">
              {/* Do zmiany className */}
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Opis</th>
                  <th>Status</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {workLog.map((log, index) => (
                  <tr key={index}>
                    <td>
                      {log.orderDate
                        ? new Date(log.orderDate).toLocaleDateString()
                        : "Brak danych"}
                    </td>
                    <td>{log.description}</td>
                    <td>{log.status}</td>
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
