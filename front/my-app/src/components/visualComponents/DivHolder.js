const DivHolder = ({ children, className, onClick, id }) => {
  return (
    <div className={className} onClick={onClick} id={id}>
      {children}
    </div>
  );
};

export default DivHolder;
