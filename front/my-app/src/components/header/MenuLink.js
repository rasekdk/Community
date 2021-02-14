import { Link, useRouteMatch } from 'react-router-dom';

const MenuLink = ({ label, to, activeOnlyWhenExact, className, active }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li className={match || active ? 'active' : ''}>
      <Link to={to} className={className}>
        {label}
      </Link>
    </li>
  );
};

export default MenuLink;
