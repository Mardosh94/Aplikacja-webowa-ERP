import React from "react";
import "../../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usuwamy token z localStorage
    localStorage.removeItem("authToken");

    // Ustawiamy isAuthenticated na false, aby wymusić przekierowanie do strony logowania
    setIsAuthenticated(false);

    // Przekierowujemy na stronę logowania
    navigate("/login");
  };

  return (
    <button className="button-logout" onClick={handleLogout}>
      Wyloguj się
    </button>
  );
};

export default LogoutButton;
