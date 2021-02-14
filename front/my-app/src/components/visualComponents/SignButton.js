import { Link } from 'react-router-dom';
import DivHolder from './DivHolder';

const SignButton = ({ children, link }) => {
  return (
    <DivHolder>
      <Link to={link} className="btn full">
        {children}
      </Link>
    </DivHolder>
  );
};

export default SignButton;
