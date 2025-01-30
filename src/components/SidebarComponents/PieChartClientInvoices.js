import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Rejestracja elementów Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartClientInvoices = () => {
  const [dane, setDane] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Invoices/getByType/1", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setDane(result);
      } catch (error) {
        console.error("Błąd pobierania danych z API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  const PieChartData = () => {
    const kwoty = dane.reduce(
      (acc, faktura) => {
        if (faktura.isPayed) {
          acc.paid += faktura.amount;
        } else {
          acc.unpaid += faktura.amount;
        }
        return acc;
      },
      { paid: 0, unpaid: 0 }
    );

    const total = kwoty.paid + kwoty.unpaid;
    const paidPercentage = ((kwoty.paid / total) * 100).toFixed(2);
    const unpaidPercentage = ((kwoty.unpaid / total) * 100).toFixed(2);

    return {
      datasets: [
        {
          label: "Kwoty faktur",
          data: [kwoty.paid, kwoty.unpaid],
          backgroundColor: [
            "rgba(39, 252, 216, 0.6)",
            "rgba(37, 107, 236, 0.6)",
          ],
          borderColor: ["rgb(123, 219, 219)", "rgb(37, 26, 97)"],
          borderWidth: 1,
        },
      ],
      labels: [
        `Opłacone ${paidPercentage}%`,
        `Nieopłacone ${unpaidPercentage}%`,
      ],
    };
  };

  if (loading) return <p>Ładowanie danych...</p>;

  return (
    <div>
      <h2>Wykres faktur dochodwych</h2>
      <Pie className="" data={PieChartData()} />
    </div>
  );
};

export default PieChartClientInvoices;
