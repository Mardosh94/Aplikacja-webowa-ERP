import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthForm from "./components/LoginRegisterPages/AuthForm";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import "./styles/App.css";
import "./styles/Buttons.css";

const App = () => {
  const [loginData, setLoginData] = useState({
    emailOrUserName: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showRegister, setShowRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const saveToken = localStorage.getItem("authToken");
    if (saveToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const onChangeLogin = (e) =>
    setLoginData({ ...loginData, emailOrUserName: e.target.value });

  const onChangeLoginPassword = (e) =>
    setLoginData({ ...loginData, password: e.target.value });

  const onChangeRegisterUserName = (e) =>
    setRegisterData({ ...registerData, userName: e.target.value });

  const onChangeEmail = (e) =>
    setRegisterData({ ...registerData, email: e.target.value });

  const onChangeRegisterPassword = (e) =>
    setRegisterData({ ...registerData, password: e.target.value });

  const onChangeConfirmPassword = (e) =>
    setRegisterData({ ...registerData, confirmPassword: e.target.value });

  const validateLoginPassword = () => {
    const newErrors = {};
    if (loginData.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }
    if (!/[A-Z]/.test(loginData.password)) {
      newErrors.password =
        "Hasło musi zawierać co najmniej jedną wielką literę.";
    }
    if (!/[0-9]/.test(loginData.password)) {
      newErrors.password = "Hasło musi zawierać co najmniej jedną cyfrę.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>-]/.test(loginData.password)) {
      newErrors.password =
        "Hasło musi zawierać co najmniej jeden znak specjalny.";
    }
    if (/\s/.test(loginData.password)) {
      newErrors.password = "Hasło nie może zawierać białych znaków.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onClickLogin = async () => {
    if (validateLoginPassword()) {
      try {
        const response = await fetch(`/Auth/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          setIsAuthenticated(true);
          console.log("Dane do logowania:", loginData);
        } else {
          const error = await response.text();
          setErrors({ server: error });
        }
      } catch (err) {
        console.error("Błąd połączenia z serwerem:", err);
      }
    }
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Hasła muszą być identyczne!";
    }

    if (registerData.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }

    if (!registerData.email) {
      newErrors.email = "Email jest wymagany!";
    }

    if (!registerData.userName) {
      newErrors.userName = "Nazwa użytkownika jest wymagana!";
    }

    if (!registerData.password || !registerData.confirmPassword) {
      newErrors.form = "Wszystkie pola muszą być wypełnione!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onClickRegister = async () => {
    if (validateRegisterForm()) {
      try {
        console.log("JSON do rejestracji", registerData);
        const response = await fetch(`/Auth/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Zarejestrowano pomyślnie!", data);
          setShowRegister(false);
        } else {
          const error = await response.text();
          setErrors({ server: error });
        }
      } catch (err) {
        console.error("Błąd połączenia z serwerem:", err);
      }
    }
  };

  const toggleForm = () => setShowRegister(!showRegister);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={<Dashboard setIsAuthenticated={setIsAuthenticated} />}
            />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthForm
                loginFormData={loginData}
                errors={errors}
                onClickLogin={onClickLogin}
                onChangePassword={onChangeLoginPassword}
                onChangeLogin={onChangeLogin}
                /////////////////////////////////////////////////////////////////
                registerFormData={registerData}
                onClickRegister={onClickRegister}
                onChangeRegisterUserName={onChangeRegisterUserName}
                onChangeEmail={onChangeEmail}
                onChangeRegisterPassword={onChangeRegisterPassword}
                onChangeConfirmPassword={onChangeConfirmPassword}
                showRegister={showRegister}
                toggleForm={toggleForm}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
