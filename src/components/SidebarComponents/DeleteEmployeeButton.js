import React from "react";

const DeleteEmployeeButton = ({ employeeId, onDelete }) => {
  const token = localStorage.getItem("authToken"); // Pobranie tokena z localStorage

  const handleDelete = () => {
    if (!token) {
      console.error("Brak tokena autoryzacyjnego. Zaloguj się ponownie.");
      return;
    }

    fetch(`/Employees/delete/${employeeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas usuwania pracownika");
        }
        onDelete(employeeId);
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania pracownika:", error);
      });
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Usuń
    </button>
  );
};

export default DeleteEmployeeButton;
