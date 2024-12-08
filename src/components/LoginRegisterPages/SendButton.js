const SendButton = ({ text, onClick }) => (
  <div className="button-send">
    <input type="button" value={text} onClick={onClick} />
  </div>
);

export default SendButton;
