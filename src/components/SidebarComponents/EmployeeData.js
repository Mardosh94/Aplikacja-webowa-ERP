import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";
import AddEmployee from "./AddEmployee";
import EditEmployeeModal from "./EditEmployeeModal"; // Nowy komponent modalu

const APIAddress = process.env.REACT_APP_API_BASE_URL;

const EmployeeData = () => {
  const [employeeData, setEmployee] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Stan kontrolujący otwarcie modalu
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // Przechowywanie edytowanego pracownika

  // Pobieranie danych pracowników
  useEffect(() => {
    fetch(`${APIAddress}/Employees/getAll`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych");
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []);

  // Usuwanie pracownika
  const handleDeleteEmployee = (id) => {
    fetch(`${APIAddress}/Employees/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas usuwania pracownika");
        }
        setEmployee((prev) => prev.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania pracownika:", error);
      });
  };

  // Funkcja otwierająca modal edycji
  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee); // Ustawiamy pracownika do edycji
    setIsModalOpen(true); // Otwieramy modal
  };

  // Funkcja do zapisania edytowanych danych
  const handleSaveEditedEmployee = (editedEmployee) => {
    fetch(`${APIAddress}/Employees/update/${editedEmployee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas zapisywania danych");
        }
        setEmployee((prev) =>
          prev.map((emp) =>
            emp.id === editedEmployee.id ? editedEmployee : emp
          )
        );
        setIsModalOpen(false); // Zamykamy modal po zapisaniu
      })
      .catch((error) => {
        console.error("Błąd podczas zapisywania danych:", error);
      });
  };

  return (
    <div>
      <h1>Lista pracowników</h1>
      <AddEmployee
        onAddEmployee={(newEmployee) =>
          setEmployee((prev) => [...prev, newEmployee])
        }
      />
      <table className="employee-table">
        <thead>
          <tr>
            <th>Imię i Nazwisko</th>
            <th>Email</th>
            <th>Data urodzenia</th>
            <th>Adres</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.id}>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>{employee.email}</td>
              <td>
                {employee.dateOfBirth
                  ? new Date(employee.dateOfBirth).toLocaleDateString()
                  : "Brak danych"}
              </td>
              <td>
                {employee.address
                  ? `${employee.address.city}, ${employee.address.postCode}, ${employee.address.street} ${employee.address.buildingNumber}`
                  : "Brak adresu"}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditEmployee(employee)}
                >
                  Edytuj
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal edycji pracownika */}
      {isModalOpen && (
        <EditEmployeeModal
          employee={employeeToEdit}
          onSave={handleSaveEditedEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeData;
