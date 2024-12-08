import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SendButton from "./SendButton";
import "../../styles/Buttons.css";
import "../../styles/InputForm.css";

const LoginForm = ({
  loginFormData,
  onChangeLogin,
  onChangePassword,
  onLogin,
  errors,
}) => (
  <form className="form-login">
    <TextInput
      placeholder="Podaj nazwę użytkownika"
      value={loginFormData.emailOrUserName}
      onChange={onChangeLogin}
    />
    <PasswordInput
      placeholder="Podaj hasło"
      value={loginFormData.password}
      onChange={onChangePassword}
    />
    {errors.password && <p className="error">{errors.password}</p>}
    <SendButton text="Zaloguj!" onClick={onLogin} />
  </form>
);

export default LoginForm;
