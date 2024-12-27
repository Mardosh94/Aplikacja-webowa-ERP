import React, { useState } from "react";
import Sidebar from "../components/SidebarComponents/Sidebar";
import "../styles/Dashboard.css";
import GoogleCalendar from "../components/SidebarComponents/GoogleCalendar";
import EmployeeData from "../components/SidebarComponents/EmployeeData";
import CustomerData from "../components/SidebarComponents/CustomerData";
import TimesheetData from "../components/SidebarComponents/TimesheetData";
import Contact from "../components/SidebarComponents/Contact";
import InvoicesClient from "../components/SidebarComponents/InvoicesClient";
import InvoicesCosts from "../components/SidebarComponents/InvoicesCosts";
import OrderListData from "../components/SidebarComponents/OrderListData";
import AddInvoice from "../components/SidebarComponents/AddInvoice";

function Dashboard({ setIsAuthenticated }) {
  const [activeComponent, setActiveComponent] = useState("KALENDARZ");
  const [activeTab, setActiveTab] = useState("client"); // Stan przechowujący aktywną zakładkę

  // Funkcja do zmiany aktywnej zakładki
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "calendar":
        return (
          <div>
            <GoogleCalendar />
          </div>
        );
      case "present-list":
        return (
          <div className="list">
            <h1>Lista obecności</h1>
            <TimesheetData />
          </div>
        );
      case "orders-list":
        return (
          <div className="list">
            <h1>Lista Zleceń</h1>
            <OrderListData />
          </div>
        );
      case "invoices":
        return (
          <div>
            <div className="invoicesChange">
              <button
                className="chooseButoon"
                onClick={() => handleTabChange("client")}
              >
                Dochód
              </button>
              <button
                className="chooseButoon"
                onClick={() => handleTabChange("costs")}
              >
                Koszty
              </button>
            </div>
            <div>
              <AddInvoice activeTab={activeTab} />
              {activeTab === "client" && (
                <div className="invoicesTables1">
                  <InvoicesClient />
                </div>
              )}
              {activeTab === "costs" && (
                <div className="invoicesTables2">
                  <InvoicesCosts />
                </div>
              )}
            </div>
          </div>
        );
      case "budget":
        return (
          <div className="list">
            <h1>Wykresy</h1>
          </div>
        );
      case "employee-data":
        return (
          <div className="list">
            <EmployeeData />
          </div>
        );
      case "customer-data":
        return (
          <div className="list">
            <CustomerData />
          </div>
        );
      case "contact":
        return (
          <div className="contact-dashboard">
            <Contact />
          </div>
        );
      case "group":
        return (
          <div className="list">
            <h1>Grupy</h1>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className="App">
      <Sidebar
        onMenuItemClick={setActiveComponent}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="content">{renderActiveComponent()}</div>
    </div>
  );
}

export default Dashboard;
