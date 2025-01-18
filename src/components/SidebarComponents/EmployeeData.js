import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";
import AddEmployee from "./AddEmployee";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeData = () => {
  const [employeeData, setEmployee] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const token = localStorage.getItem("authToken"); // Pobierz token z localStorage

  const fetchEmployees = async () => {
    try {
      if (!token) {
        throw new Error("Brak tokena autoryzacyjnego. Zaloguj się ponownie.");
      }

      const response = await fetch(`/Employees/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Dodanie nagłówka Authorization
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        throw new Error("Nieautoryzowany dostęp. Zaloguj się ponownie.");
      }

      if (!response.ok) {
        throw new Error("Błąd podczas pobierania danych");
      }

      const data = await response.json();
      setEmployee(data); // Aktualizacja stanu
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  });

  const handleDeleteEmployee = (id) => {
    if (!token) {
      console.error("Brak tokena autoryzacyjnego. Zaloguj się ponownie.");
      return;
    }

    fetch(`/Employees/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie nagłówka Authorization
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas usuwania pracownika");
        }
        // Usuń pracownika z listy po udanym usunięciu na serwerze
        setEmployee((prev) => prev.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania pracownika:", error.message);
      });
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleAddNewEmployee = (newEmployee) => {
    if (!token) {
      console.error("Brak tokena autoryzacyjnego. Zaloguj się ponownie.");
      return;
    }

    fetch(`/Employees/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie nagłówka Authorization
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        throw new Error("Błąd podczas dodawania pracownika");
      })
      .then((createdEmployee) => {
        setEmployee((prev) => [...prev, createdEmployee]);
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania pracownika:", error.message);
      });
  };

  const handleSaveEditedEmployee = (editedEmployee) => {
    if (!token) {
      console.error("Brak tokena autoryzacyjnego. Zaloguj się ponownie.");
      return;
    }

    fetch(`/Employees/update?id=${editedEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: editedEmployee.firstName,
        lastName: editedEmployee.lastName,
        email: editedEmployee.email,
        phoneNumber: editedEmployee.phoneNumber,
        dateOfBirth: editedEmployee.dateOfBirth,
        address: editedEmployee.address,
      }),
    })
      .then((response) => {
        console.log(
          JSON.stringify({
            firstName: editedEmployee.firstName,
            lastName: editedEmployee.lastName,
            email: editedEmployee.email,
            phoneNumber: editedEmployee.phoneNumber,
            dateOfBirth: editedEmployee.dateOfBirth,
            address: editedEmployee.address,
          })
        );
        if (!response.ok) {
          throw new Error("Błąd podczas zapisywania danych");
        }
        return response.json();
      })
      .then((updatedData) => {
        setEmployee((prev) =>
          prev.map((emp) =>
            emp.id === editedEmployee.id ? { ...emp, ...updatedData } : emp
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Błąd podczas zapisywania danych:", error.message);
      });
  };

  return (
    <div>
      <AddEmployee onAddEmployee={handleAddNewEmployee} />
      <h1> Lista pracowników</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Imię i Nazwisko</th>
            <th>Email</th>
            <th>Numer telefonu</th>
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
              <td>{employee.phoneNumber}</td>
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
              <td className="actions">
                <button onClick={() => handleEditEmployee(employee)}>
                  Edytuj
                </button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
