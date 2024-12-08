const RegisterButton = ({ text, onClick }) => (
  <div className="button-register">
    <input type="button" value={text} onClick={onClick} />
  </div>
);

export default RegisterButton;
