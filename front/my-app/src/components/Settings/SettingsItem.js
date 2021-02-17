import { Link } from 'react-router-dom';
import IconNext from '../icons/IconNext';

const SettingsItem = ({ children, title, to }) => {
  return (
    <Link className="settings-link" to={to}>
      <div>
        {children}
        {title}
      </div>
      <IconNext className="ico small next" />
    </Link>
  );
};

export default SettingsItem;
