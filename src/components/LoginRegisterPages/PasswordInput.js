const PasswordInput = ({ placeholder, value, onChange, name }) => (
  <div className="password-input-group">
    <input
      type="password"
      name={name} // Umożliwia dynamiczne przypisanie nazw
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Obsługuje zmiany w polu
    />
  </div>
);

export default PasswordInput;
