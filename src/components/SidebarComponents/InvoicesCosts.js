import React, { useState, useEffect } from "react";
import DeleteInvoiceButton from "./DeleteInvoiceButton";
import "../../styles/Dashboard.css";

const InvoicesCosts = () => {
  const [faktury, setFaktury] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Pobranie tokena z localStorage
    if (!token) {
      console.error("Brak tokena autoryzacyjnego. Zaloguj się ponownie.");
      return;
    }

    fetch("/Invoices/getByType/2", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokena w nagłówkach
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych");
        }
        return response.json();
      })
      .then((data) => {
        setFaktury(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []);

  const handleDeleteSuccess = (id) => {
    const updatedInvoices = faktury.filter((invoice) => invoice.id !== id);
    setFaktury(updatedInvoices);
  };

  return (
    <div className="table-invoice">
      <h1 style={{ color: "#3498db" }}>Faktury Koszty</h1>
      <table>
        <thead>
          <tr>
            <th>Numer faktury</th>
            <th>Data wystawienia</th>
            <th>Termin zapłaty</th>
            <th>Kwota</th>
            <th>Status</th>
            <th>Zapłacono</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {faktury.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>
                {invoice.invoiceDate
                  ? new Date(invoice.invoiceDate).toLocaleDateString()
                  : "Brak danych"}
              </td>
              <td>
                {invoice.dueDate
                  ? new Date(invoice.dueDate).toLocaleDateString()
                  : "Brak danych"}
              </td>
              <td>{invoice.amount} PLN</td>
              <td>{invoice.isPayed ? "Opłacona" : "Nieopłacona"}</td>
              <td>
                {invoice.paymentDate
                  ? new Date(invoice.paymentDate).toLocaleDateString()
                  : ""}
              </td>
              <td>
                <DeleteInvoiceButton
                  invoiceId={invoice.id}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesCosts;
