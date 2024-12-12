import React from "react";

const DeleteTimesheetButton = ({ employeeId, timesheetId, onDelete }) => {
  const handleDelete = () => {
    fetch(`/Timesheet/delete/${employeeId}/${timesheetId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas usuwania pracownika");
        }
        onDelete(employeeId, timesheetId);
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

export default DeleteTimesheetButton;
