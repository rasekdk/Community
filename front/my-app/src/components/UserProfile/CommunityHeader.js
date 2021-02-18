import IconLogo from '../icons/IconLogo';
import { Link } from 'react-router-dom';
import { Children } from 'react';

const CommunityHeader = ({ data, name, avatar, children, creator }) => {
  const { REACT_APP_URL_IMG } = process.env;
  return (
    <header className="community-header">
      {data ? (
        avatar === 'avatar-img' || !avatar ? (
          <IconLogo className="ico logo x-large" />
        ) : (
          <img src={`${REACT_APP_URL_IMG}/${avatar}`} alt={`${name} Avatar`} className="x-large" />
        )
      ) : null}
      <Link to={`/c/${name}`}>c/{name}</Link>
      <Link to={`/u/${creator}`} className="unfocus-text" style={{ fontSize: '.75rem', marginTop: '0' }}>
        by u/{creator}
      </Link>
      {children}
    </header>
  );
};

export default CommunityHeader;
