const LoginButton = ({ text, onClick }) => (
  <div className="button-login">
    <input type="button" value={text} onClick={onClick} />
  </div>
);

export default LoginButton;
