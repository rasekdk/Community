import IconLogo from '../icons/IconLogo';
import Separator from '../visualComponents/Separator';
import SignLink from '../visualComponents/SignLink';
import RegisterForm from '../forms/RegisterForm';
import { Link } from 'react-router-dom';
import DivHolder from '../visualComponents/DivHolder';

const RegisterPage = () => {
  return (
    <section className="register-page main-section no-sub-header">
      <Link to="/" className="icon-link">
        <IconLogo className="large ico logo" />
      </Link>
      <DivHolder className="div-holder">
        <RegisterForm />
      </DivHolder>
      <Separator />
      <SignLink link="/login">Accede</SignLink>
    </section>
  );
};

export default RegisterPage;
