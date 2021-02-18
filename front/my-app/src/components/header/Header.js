import { useContext, useState } from 'react';
import { decodeToken } from 'react-jwt';
import useChangeColor from '../../hooks/useColor';
import useRemoteData from '../../hooks/useRemoteData';
import IconLogo from '../icons/IconLogo';
import { AuthContext } from '../providers/AuthProvider';
import SettingsItem from '../Settings/SettingsItem';

const Header = ({ burger, setBurger }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const name = !decodedToken ? '' : decodedToken.name;
  const { REACT_APP_URL_IMG, REACT_APP_URL } = process.env;
  const url = `${REACT_APP_URL}/u/${name}`;
  const [user] = useRemoteData(url, auth);

  const searchUrl = `${REACT_APP_URL}/search`;

  const [search, setSearch] = useRemoteData(searchUrl, auth);
  const [showData, setShowData] = useState();
  const [showSelector, setShowSelector] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 0) {
      setShowSelector(true);
    } else {
      setShowSelector(false);
    }

    const data = search.filter((s) => {
      const writed = s.name.toLowerCase();

      return writed.includes(value);
    });

    setShowData(data.slice(0, 5));
    console.log(showData);
  };

  const hideModal = () => setShowSelector(false);

  return (
    <header>
      {showSelector ? (
        <div className="modal-full" style={{ backgroundColor: 'transparent' }} onClick={hideModal} />
      ) : null}
      {user ? (
        user.userAvatar === 'avatar-img' || !user.userAvatar ? (
          <IconLogo className="logo ico medium" onClick={() => setBurger(!burger)} />
        ) : (
          <img src={`${REACT_APP_URL_IMG}/${user.userAvatar}`} onClick={() => setBurger(!burger)} alt="user avatar" />
        )
      ) : (
        <IconLogo className="logo ico medium" />
      )}
      <form style={{ zIndex: '1' }}>
        <input placeholder="Search..." onChange={handleChange} />
        {showSelector ? (
          <div className="search-selector" onClick={hideModal}>
            {showData.map((data) => (
              <SettingsItem to={data.url} title={data.name}>
                {data ? (
                  data.avatar === 'avatar-img' || !data.avatar ? (
                    <IconLogo className="logo ico s-m" />
                  ) : (
                    <img src={`${REACT_APP_URL_IMG}/${data.avatar}`} alt="user avatar" className=" s-m ico" />
                  )
                ) : (
                  <IconLogo className="logo ico medium" />
                )}
              </SettingsItem>
            ))}
          </div>
        ) : null}
      </form>
    </header>
  );
};

export default Header;
