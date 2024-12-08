import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SendButton from "./SendButton";
import "../../styles/InputForm.css";

const RegisterForm = ({
  registerFormData,
  onChangeUserName,
  onChangeEmail,
  onChangeRegisterPassword,
  onChangeConfirmPassword,
  onClickRegister,
  errors,
}) => (
  <form className="form-register">
    <TextInput
      placeholder="Podaj nazwę użytkownika"
      value={registerFormData.userName}
      onChange={onChangeUserName}
    />
    {errors.userName && <p className="error">{errors.userName}</p>}{" "}
    {/* Pokazywanie błędu dla nazwy użytkownika */}
    <TextInput
      placeholder="Podaj email"
      value={registerFormData.email}
      onChange={onChangeEmail}
    />
    {errors.email && <p className="error">{errors.email}</p>}{" "}
    {/* Pokazywanie błędu dla emaila */}
    <PasswordInput
      placeholder="Podaj hasło"
      value={registerFormData.password}
      onChange={onChangeRegisterPassword}
    />
    {errors.password && <p className="error">{errors.password}</p>}{" "}
    {/* Pokazywanie błędu dla hasła */}
    <PasswordInput
      placeholder="Powtórz hasło"
      value={registerFormData.confirmPassword}
      onChange={onChangeConfirmPassword}
    />
    {errors.confirmPassword && (
      <p className="error">{errors.confirmPassword}</p>
    )}{" "}
    {/* Pokazywanie błędu dla potwierdzenia hasła */}
    <SendButton text="Zarejestruj się" onClick={onClickRegister} />
  </form>
);

export default RegisterForm;
