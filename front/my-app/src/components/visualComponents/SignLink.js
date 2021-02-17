import { Link } from 'react-router-dom';

const SignLink = ({ children, link, onClick }) => {
  return (
    <div className="access-link">
      <Link to={link} onClick={onClick}>
        {children}
      </Link>
    </div>
  );
};

export default SignLink;
