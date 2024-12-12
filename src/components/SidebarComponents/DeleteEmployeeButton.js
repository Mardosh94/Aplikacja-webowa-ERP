import React from "react";

const DeleteEmployeeButton = ({ employeeId, onDelete }) => {
  const handleDelete = () => {
    fetch(`$/Employees/delete/${employeeId}`, {
      method: "DELETE",
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
