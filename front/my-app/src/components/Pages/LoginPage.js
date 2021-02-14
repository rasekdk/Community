import IconLogo from '../icons/IconLogo';
import Separator from '../visualComponents/Separator';
import SignLink from '../visualComponents/SignLink';
import LoginForm from '../forms/LoginForm';
import { Link } from 'react-router-dom';
import DivHolder from '../visualComponents/DivHolder';

const LoginPage = () => {
  return (
    <section className="login-page main-section no-sub-header">
      <Link to="/" className="icon-link">
        <IconLogo className="large ico logo" />
      </Link>
      <DivHolder className="div-holder">
        <LoginForm />
      </DivHolder>
      <Separator />
      <SignLink link="/register">Registrate</SignLink>
    </section>
  );
};

export default LoginPage;
