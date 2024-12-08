const TextInput = ({ placeholder, value, onChange }) => (
  <div className="text-input-group">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
