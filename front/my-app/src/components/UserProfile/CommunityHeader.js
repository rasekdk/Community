import IconUser from '../icons/IconUser';
import { Link } from 'react-router-dom';
import { Children } from 'react';

const CommunityHeader = ({ data, name, avatar, children }) => {
  const { REACT_APP_URL_IMG } = process.env;
  return (
    <header className="community-header">
      {data ? (
        avatar === 'avatar-img' || !avatar ? (
          <IconUser className="ico logo x-large" />
        ) : (
          <img src={`${REACT_APP_URL_IMG}/${avatar}`} alt={`${name} Avatar`} className="x-large" />
        )
      ) : null}
      <Link to={`/c/${name}`}>c/{name}</Link>
      {children}
    </header>
  );
};

export default CommunityHeader;
