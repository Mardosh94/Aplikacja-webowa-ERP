import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";

const AddInvoice = ({ activeTab }) => {
  // Stan formularza
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    amount: "",
    isPayed: false,
    invoiceType: activeTab === "client" ? 1 : 2, // Ustawienie invoiceType na podstawie activeTab
    paymentDate: "",
  });

  const [error, setError] = useState(""); // Poprawne użycie useState
  const [success, setSuccess] = useState(""); // Poprawne użycie useState

  // Ustawiamy invoiceType na podstawie aktywnej zakładki
  useEffect(() => {
    setNewInvoice((prevState) => ({
      ...prevState,
      invoiceType: activeTab === "client" ? 1 : 2, // 1 dla dochodowej, 2 dla kosztowej
    }));
  }, [activeTab]);

  // Obsługuje zmianę w formularzu
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNewInvoice((prevState) => ({
        ...prevState,
        [name]: checked,
        paymentDate: checked ? "" : prevState.paymentDate, // Reset paymentDate, gdy faktura jest opłacona
      }));
    } else {
      setNewInvoice((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Obsługuje dodanie faktury
  const handleAddInvoice = () => {
    if (
      !newInvoice.invoiceNumber ||
      !newInvoice.invoiceDate ||
      !newInvoice.dueDate ||
      !newInvoice.amount ||
      !newInvoice.invoiceType
    ) {
      setError("Wszystkie pola muszą zostać uzupełnione.");
      return;
    }

    if (newInvoice.isPayed && !newInvoice.paymentDate) {
      setError("Musisz podać datę zapłaty, jeśli faktura jest opłacona.");
      return;
    }

    const invoiceData = {
      invoiceNumber: newInvoice.invoiceNumber,
      invoiceDate: newInvoice.invoiceDate,
      dueDate: newInvoice.dueDate,
      amount: parseFloat(newInvoice.amount),
      isPayed: newInvoice.isPayed,
      invoiceType: newInvoice.invoiceType,
      paymentDate: newInvoice.isPayed ? newInvoice.paymentDate : null, // Dodanie paymentDate tylko jeśli faktura jest opłacona
    };

    // Wywołanie metody fetch
    fetch("/Invoices/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas dodawania faktury");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("Faktura została pomyślnie dodana!");
        setError("");
        // Opcjonalnie: resetowanie formularza
        setNewInvoice({
          invoiceNumber: "",
          invoiceDate: "",
          dueDate: "",
          amount: "",
          isPayed: false,
          invoiceType: activeTab === "client" ? 1 : 2,
          paymentDate: "",
        });
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });
  };

  return (
    <div className="add-invoice">
      <h2>
        {activeTab === "client"
          ? "Dodaj fakturę dochodową"
          : "Dodaj fakturę kosztową"}
      </h2>

      {/* Wyświetlanie komunikatów o błędzie i sukcesie */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Tabela formularza */}
      <table className="inputTables">
        <thead>
          <tr>
            <th>Numer faktury</th>
            <th>Data wystawienia</th>
            <th>Termin zapłaty</th>
            <th>Kwota</th>
            <th>Typ faktury</th>
            <th>Opłacona</th>
            {newInvoice.isPayed && <th>Data zapłaty</th>}
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="invoiceNumber"
                value={newInvoice.invoiceNumber}
                onChange={handleChange}
                placeholder="Numer faktury"
              />
            </td>
            <td>
              <input
                type="date"
                name="invoiceDate"
                value={newInvoice.invoiceDate}
                onChange={handleChange}
                placeholder="Data wystawienia"
              />
            </td>
            <td>
              <input
                type="date"
                name="dueDate"
                value={newInvoice.dueDate}
                onChange={handleChange}
                placeholder="Termin zapłaty"
              />
            </td>
            <td>
              <input
                type="number"
                name="amount"
                value={newInvoice.amount}
                onChange={handleChange}
                placeholder="Kwota"
              />
            </td>
            <td>
              <select
                name="invoiceType"
                value={newInvoice.invoiceType}
                onChange={handleChange}
                disabled
              >
                <option value={1}>Dochód</option>
                <option value={2}>Koszty</option>
              </select>
            </td>
            <td>
              <label>
                <input
                  type="checkbox"
                  name="isPayed"
                  checked={newInvoice.isPayed}
                  onChange={handleChange}
                />
                Opłacona
              </label>
            </td>
            {newInvoice.isPayed && (
              <td>
                <input
                  type="date"
                  name="paymentDate"
                  value={newInvoice.paymentDate}
                  onChange={handleChange}
                  placeholder="Data zapłaty"
                />
              </td>
            )}
            <td>
              <button type="button" onClick={handleAddInvoice}>
                Dodaj fakturę
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddInvoice;
