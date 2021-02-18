import { Link } from 'react-router-dom';
import DivHolder from './DivHolder';

const SignButton = ({ children, link, onClick, className, classNameDiv }) => {
  return (
    <DivHolder className={classNameDiv}>
      <Link to={link} onClick={onClick} className={`btn full ${className}`}>
        {children}
      </Link>
    </DivHolder>
  );
};

export default SignButton;
