import { Link } from 'react-router-dom';
import Icon404 from '../icons/Icon404';

const Page404 = () => {
  return (
    <section className="page-not-found main-section have-sub-header">
      <h1>Vaya!!</h1>
      <Icon404 className="ico white not-found" />
      <h2>Parece que te has perdido</h2>
      <Link to={''} className={'btn full'}>
        Volver
      </Link>
    </section>
  );
};

export default Page404;
