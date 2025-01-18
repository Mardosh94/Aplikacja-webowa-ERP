const delteOrderButton = (customerId, orderId) => {
  const token = localStorage.getItem("authToken");

  return fetch(`/Customers/${customerId}/Orders/${orderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        if (response.status === 204) {
          console.log("Wpis usunięty pomyślnie, brak danych w odpowiedzi.");
          return null;
        }
        return response.json();
      } else {
        return response.text().then((errorText) => {
          console.error(
            `Błąd podczas usuwania wpisu: ${response.status}, ${errorText}`
          );
          throw new Error(`Błąd: ${response.status}. ${errorText}`);
        });
      }
    })
    .catch((error) => {
      console.error("Błąd podczas usuwania wpisu:", error);
      throw error;
    });
};

export default delteOrderButton;
