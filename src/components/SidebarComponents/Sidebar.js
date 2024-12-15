import React, { useState, useEffect } from "react";
import Icons from "./Icons";
import "../../styles/Sidebar.css";
import LogoutButton from "../LoginRegisterPages/LogoutButton";

const Sidebar = ({ onMenuItemClick, setIsAuthenticated }) => {
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem("calendar");
    onMenuItemClick("calendar");
  }, [onMenuItemClick]);

  const handleItemClick = (text) => {
    setActiveItem(text);
    onMenuItemClick(text);
  };

  return (
    <div className={`sidebar`}>
      <ul>
        <li>
          <Icons
            text="KALENDARZ"
            isActive={activeItem === "calendar"}
            onClick={() => handleItemClick("calendar")}
          />
        </li>
        <li>
          <Icons
            text="LISTA OBECNOŚCI"
            isActive={activeItem === "present-list"}
            onClick={() => handleItemClick("present-list")}
          />
        </li>
        <li>
          <Icons
            text="LISTA ZLECEŃ"
            isActive={activeItem === "orders-list"}
            onClick={() => handleItemClick("orders-list")}
          />
        </li>
        <li>
          <Icons
            text="FAKTURY"
            isActive={activeItem === "invoices"}
            onClick={() => handleItemClick("invoices")}
          />
        </li>
        <li>
          <Icons
            text="BUDŻET"
            isActive={activeItem === "budget"}
            onClick={() => handleItemClick("budget")}
          />
        </li>
        <li>
          <Icons
            text="DANE PRACOWNIKÓW"
            isActive={activeItem === "employee-data"}
            onClick={() => handleItemClick("employee-data")}
          />
        </li>
        <LogoutButton setIsAuthenticated={setIsAuthenticated} />
      </ul>
    </div>
  );
};

export default Sidebar;
