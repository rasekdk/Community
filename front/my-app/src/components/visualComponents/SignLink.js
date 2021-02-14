import { Link } from 'react-router-dom';

const SignLink = ({ children, link }) => {
  return (
    <div className="access-link">
      <Link to={link}>{children}</Link>
    </div>
  );
};

export default SignLink;
