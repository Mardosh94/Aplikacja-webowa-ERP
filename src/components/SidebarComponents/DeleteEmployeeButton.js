import React from "react";

const APIAddress = process.env.REACT_APP_API_BASE_URL;

const DeleteEmployeeButton = ({ employeeId, onDelete }) => {
  const handleDelete = () => {
    fetch(`${APIAddress}/Employees/delete/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas usuwania pracownika");
        }
        onDelete(employeeId); // Wywołanie funkcji aktualizacji po usunięciu
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
