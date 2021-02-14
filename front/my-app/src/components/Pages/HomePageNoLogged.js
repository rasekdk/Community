import IntroBlock from '../IntroBlock.js';
import Separator from '../visualComponents/Separator';
import SignLink from '../visualComponents/SignLink';
import SignButton from '../visualComponents/SignButton';

const HomePageNoLogged = () => {
  return (
    <section className="main-section have-sub-header home-no-logged">
      <IntroBlock />

      <div>
        <SignButton link="/register"> Registrate</SignButton>
        <Separator />
        <SignLink link="/login">Accede</SignLink>
      </div>
    </section>
  );
};

export default HomePageNoLogged;
