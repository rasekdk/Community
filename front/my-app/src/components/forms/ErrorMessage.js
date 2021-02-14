const ErrorMessage = ({ error, className }) => {
  if (error) {
    switch (error.type) {
      case 'required':
        return <p className={className}>Este campo es obligatorio</p>;
      case 'minLength':
        return <p className={className}>El campo es demasiado corto</p>;
      case 'pattern':
        return (
          <p className={className}>
            Se necesita una direccion de correo valido
          </p>
        );
      case 'validate':
        return <p className={className}>Ya existe ese usuario</p>;
      case 'custom':
        return <p className={className}>{error.message}</p>;
      default:
        return null;
    }
  }

  return null;
};

export default ErrorMessage;
