import { Link } from 'react-router-dom';
import DivHolder from './DivHolder';

const SignButton = ({ children, link, onClick }) => {
  return (
    <DivHolder>
      <Link to={link} onClick={onClick} className="btn full">
        {children}
      </Link>
    </DivHolder>
  );
};

export default SignButton;
