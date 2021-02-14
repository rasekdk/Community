const InputElement = ({ id, value, setValue, type, required, children }) => {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'inline-block', width: 100 }}>
        {children}
      </label>
      <input
        value={value}
        id={id}
        name={id}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        ref={required}
      />
    </div>
  );
};

export default InputElement;
