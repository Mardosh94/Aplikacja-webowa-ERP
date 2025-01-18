const PasswordInput = ({ placeholder, value, onChange, name }) => (
  <div className="password-input-group">
    <input
      type="password"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default PasswordInput;
