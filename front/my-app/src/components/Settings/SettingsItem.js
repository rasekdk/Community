import { Link } from 'react-router-dom';
import IconNext from '../icons/IconNext';

const SettingsItem = ({ children, title, to, className }) => {
  return (
    <Link className={`settings-link ${className}`} to={to}>
      <div>
        {children}
        {title}
      </div>
      <IconNext className="ico small next" />
    </Link>
  );
};

export default SettingsItem;
