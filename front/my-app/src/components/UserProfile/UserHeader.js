import IconUser from '../icons/IconUser';
import { Link } from 'react-router-dom';
import { Children } from 'react';

const UserHeader = ({ user, decodedToken, openChangeAvatar, children }) => {
  const { REACT_APP_URL_IMG } = process.env;
  return (
    <header className="user-header">
      {user ? (
        user.userAvatar === 'avatar-img' || !user.userAvatar ? (
          <IconUser className="ico logo x-large" />
        ) : (
          <img src={`${REACT_APP_URL_IMG}/${user.userAvatar}`} alt={`${user.userName} Avatar`} className="x-large" />
        )
      ) : null}
      <Link to={`/u/${user.userName}`}>u/{user.userName}</Link>
      {decodedToken ? (
        decodedToken.id === user.userId ? (
          <button to={'/change-avatar'} className="btn full" onClick={openChangeAvatar}>
            Cambiar el Avatar
          </button>
        ) : null
      ) : null}
      {children}
    </header>
  );
};

export default UserHeader;
