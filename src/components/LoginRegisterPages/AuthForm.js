import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RegisterButton from "./RegisterButton";
import "../../styles/App.css";
import "../../styles/Buttons.css";
import LoginPhoto from "../../styles/photos/loginfotka.png";
import RegisterPhoto from "../../styles/photos/registerfotka.png";

const AuthForm = ({
  showRegister,
  errors,
  onChangeLogin,
  onChangePassword,
  onClickLogin,
  onClickRegister,
  onChangeRegisterUserName,
  onChangeEmail,
  loginFormData,
  registerFormData,
  toggleForm,
  onChangeRegisterPassword,
  onChangeConfirmPassword,
}) => (
  <div className="layout">
    <div className="container">
      <div className="header">
        <h1>{showRegister ? "Dołącz Do Nas!" : "Witaj Z Powrotem!"}</h1>
        <h2>{showRegister ? "Zarejestruj się" : "Zaloguj się"}</h2>
        <hr />
      </div>
      {showRegister ? (
        <RegisterForm
          registerFormData={registerFormData}
          onChangeUserName={onChangeRegisterUserName}
          onChangeEmail={onChangeEmail}
          onChangeRegisterPassword={onChangeRegisterPassword}
          onChangeConfirmPassword={onChangeConfirmPassword}
          onClickRegister={onClickRegister}
          errors={errors}
        />
      ) : (
        <LoginForm
          loginFormData={loginFormData} // Przekazywanie danych do formularza logowania
          errors={errors} // Przekazanie błędów do formularza logowania
          onChangeLogin={onChangeLogin} // Funkcja do zmiany loginu
          onChangePassword={onChangePassword} // Funkcja do zmiany hasła
          onLogin={onClickLogin} // Obsługa logowania
        />
      )}
    </div>
    <div className="image-container">
      <div className="button-toggle">
        <RegisterButton
          text={showRegister ? "Zaloguj!" : "Zarejestruj się"}
          onClick={toggleForm} // Funkcja do przełączania formularzy
        />
      </div>
      {!showRegister ? (
        <img src={LoginPhoto} alt="Login" className="image" />
      ) : (
        <img src={RegisterPhoto} alt="Register" className="image" />
      )}
    </div>
  </div>
);

export default AuthForm;
