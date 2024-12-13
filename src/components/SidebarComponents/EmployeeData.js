import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";
import AddEmployee from "./AddEmployee";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeData = () => {
  const [employeeData, setEmployee] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const fetchEmployees = () => {
    fetch(`/Employees/getAll`)
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
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = (id) => {
    fetch(`/Employees/delete/${id}`, {
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

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleAddNewEmployee = (newEmployee) => {
    fetch(`/Employees/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        console.error("Błąd podczas dodawania pracownika:", error);
      });
  };

  const handleSaveEditedEmployee = (editedEmployee) => {
    fetch(`/Employees/update?id=${editedEmployee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
        console.error("Błąd podczas zapisywania danych:", error);
      });
  };

  return (
    <div>
      <h1>Lista pracowników</h1>
      <AddEmployee onAddEmployee={handleAddNewEmployee} />
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
