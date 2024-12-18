const deleteTimesheetButton = (employeeId, timesheetId) => {
  return fetch(`/Employees/${employeeId}/Timesheets/${timesheetId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Wpis usunięty pomyślnie, brak danych w odpowiedzi.");
        return null;
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Błąd podczas usuwania wpisu:", error);
      throw error;
    });
};

export default deleteTimesheetButton;
