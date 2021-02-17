import { useContext } from 'react';
import { decodeToken } from 'react-jwt';
import useChangeColor from '../../hooks/useColor';
import useRemoteData from '../../hooks/useRemoteData';
import IconLogo from '../icons/IconLogo';
import { AuthContext } from '../providers/AuthProvider';

const Header = ({ burger, setBurger }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const name = !decodedToken ? '' : decodedToken.name;
  const { REACT_APP_URL_IMG, REACT_APP_URL } = process.env;
  const url = `${REACT_APP_URL}/u/${name}`;
  const [user] = useRemoteData(url, auth);

  return (
    <header>
      {user ? (
        user.userAvatar === 'avatar-img' || !user.userAvatar ? (
          <IconLogo className="logo ico medium" onClick={() => setBurger(!burger)} />
        ) : (
          <img src={`${REACT_APP_URL_IMG}/${user.userAvatar}`} onClick={() => setBurger(!burger)} alt="user avatar" />
        )
      ) : (
        <IconLogo className="logo ico medium" />
      )}
      <form>
        <input placeholder="Search..." />
      </form>
    </header>
  );
};

export default Header;
