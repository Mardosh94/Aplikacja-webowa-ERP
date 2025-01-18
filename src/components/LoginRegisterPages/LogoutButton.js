import React from "react";
import "../../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    setIsAuthenticated(false);

    navigate("/login");
  };

  return (
    <button className="button-logout" onClick={handleLogout}>
      Wyloguj się
    </button>
  );
};

export default LogoutButton;
