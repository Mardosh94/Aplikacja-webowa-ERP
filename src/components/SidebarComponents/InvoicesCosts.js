import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";

//const APIAddress = process.env.REACT_APP_API_BASE_URL;

const InvoicesCosts = () => {
  const [faktury, setFaktury] = useState([]);

  useEffect(() => {
    fetch("https://67121aba4eca2acdb5f71902.mockapi.io/faktury_koszty")
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

  return (
    <div>
      <h1 style={{ color: "#3498db" }}>Faktury Koszty</h1>
      <table>
        <thead>
          <tr>
            <th>Numer faktury</th>
            <th>Klient</th>
            <th>Data wystawienia</th>
            <th>Termin zapłaty</th>
            <th>Kwota</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {faktury.map((faktura) => (
            <tr key={faktura.id}>
              <td>{faktura.numer_faktury}</td>
              <td>{faktura.nazwa_klienta}</td>
              <td>{faktura.data_wystawienia}</td>
              <td>{faktura.termin_zaplaty}</td>
              <td>{faktura.kwota} PLN</td>
              <td>{faktura.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesCosts;
