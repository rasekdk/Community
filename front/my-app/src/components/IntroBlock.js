import IconLogo from './icons/IconLogo.js';

const IntroBlock = () => {
  return (
    <section>
      <div className="intro-block main">
        <IconLogo className="large ico logo" />
        <div className="intro-text">
          <h1>Hola!</h1>
          <h2>Bienvenido a Community</h2>
        </div>
      </div>
      <div className="intro-block">
        <IconLogo className="medium ico logo" />
        <div className="intro-text">
          <h1>Unete!</h1>
          <h2>descubre comunidades y conoce a gente como tu</h2>
        </div>
      </div>
      <div className="intro-block">
        <IconLogo className="medium ico logo" />
        <div className="intro-text">
          <h1>Crea!</h1>
          <h2>crea tus propios posts para que la gente los vea y comparta</h2>
        </div>
      </div>
      <div className="intro-block">
        <IconLogo className="medium ico logo" />
        <div className="intro-text">
          <h1>Vota!</h1>
          <h2>vota los post de los demás para que otra gente los vea</h2>
        </div>
      </div>
    </section>
  );
};

export default IntroBlock;
