import { useHistory } from 'react-router-dom';
import MenuLink from './MenuLink.js';
import IconBack from '../icons/IconBack';

const SubHeaderBack = ({ currentRoute }) => {
  const history = useHistory();

  const routesFollow = ['/c', '/t'];

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="sub-header-back">
      <IconBack className="ico small back" onClick={goBack} />

      {routesFollow.includes(currentRoute) ? (
        <ul className="menu-links">
          <MenuLink activeOnlyWhenExact={true} to="/c" label="Communidades" className="link" />
          <MenuLink to="/t" label="Temas" className="link" />
        </ul>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default SubHeaderBack;
