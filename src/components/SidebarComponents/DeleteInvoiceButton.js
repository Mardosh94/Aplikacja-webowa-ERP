const DeleteInvoiceButton = ({ invoiceId, onDeleteSuccess }) => {
  const handleDelete = () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę fakturę?");
    if (confirmed) {
      fetch(`/Invoices/delete/${invoiceId}`, {
        method: "DELETE", // Zakładając, że masz odpowiedni endpoint w backendzie do usuwania
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Błąd przy usuwaniu faktury");
          }
          onDeleteSuccess(invoiceId); // Wywołanie funkcji po pomyślnym usunięciu
        })
        .catch((error) => {
          console.error("Błąd podczas usuwania faktury:", error);
        });
    }
  };

  return <button onClick={handleDelete}>Usuń</button>;
};

export default DeleteInvoiceButton;
