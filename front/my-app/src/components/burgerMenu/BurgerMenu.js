import UserHeader from '../UserProfile/UserHeader';
import DivHolder from '../visualComponents/DivHolder';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';

import useScroll from '../../hooks/useScroll.js';
import useRemoteData from '../../hooks/useRemoteData';
import useChangeColor from '../../hooks/useColor';

import { useLocation } from 'react-router';
import AvatarModal from '../UserProfile/AvatarModal';
import IconCross from '../icons/IconCross';
import IconList from '../icons/IconList';
import { Link } from 'react-router-dom';
import IconUser from '../icons/IconUser';
import IconSettings from '../icons/IconSettings';

const BurgerMenu = ({ hideModal, modalHandler, setColor }) => {
  const [auth] = useContext(AuthContext);

  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;

  const decodedToken = decodeToken(auth);

  const userUrl = auth ? `${REACT_APP_URL}/u/${decodedToken.name}` : undefined;

  const [user, setUser] = useRemoteData(userUrl, auth);

  const [modal, setModal] = useState(false);
  const [settings, setSettings] = useState(false);

  // Change modal state
  useEffect(() => {
    setModal(modalHandler);
  }, [modalHandler]);

  const handleHide = () => {
    setModal(!modal);
    setTimeout(() => hideModal(), 400);
  };

  useScroll(modal);

  return (
    <DivHolder>
      <div className={modal ? 'modal-full open' : 'modal-full close'} onClick={handleHide} />
      <DivHolder className={modal ? 'burger-menu open' : 'burger-menu close'}>
        {auth ? (
          <header className="user-header">
            <IconCross className="ico small" onClick={handleHide} />

            <Link to={`/u/${user.userName}`} onClick={handleHide}>
              {user ? (
                user.userAvatar === 'avatar-img' || !user.userAvatar ? (
                  <IconUser className="ico logo x-large" />
                ) : (
                  <img
                    src={`${REACT_APP_URL_IMG}/${user.userAvatar}`}
                    alt={`${user.userName} Avatar`}
                    className="x-large"
                  />
                )
              ) : null}
            </Link>
            <Link to={`/u/${user.userName}`} onClick={handleHide}>
              u/{user.userName}
            </Link>
          </header>
        ) : null}
        <ul className="menu-list">
          {decodedToken ? (
            <li style={{ marginBottom: '1rem' }}>
              <Link to={`/u/${decodedToken.name}`} onClick={handleHide}>
                {!auth ? (
                  user.userAvatar === 'avatar-img' || !user.userAvatar ? (
                    <IconUser className="ico logo small" />
                  ) : (
                    <img
                      src={`${REACT_APP_URL_IMG}/${user.userAvatar}`}
                      alt={`${user.userName} Avatar`}
                      className="medium avatar"
                    />
                  )
                ) : null}
                Mi Perfil
              </Link>
            </li>
          ) : null}
          <li>
            <Link to={`/home`} onClick={handleHide}>
              <IconList className="ico small" />
              Home
            </Link>
          </li>
          <li>
            <Link to={`/new`} onClick={handleHide}>
              <IconList className="ico small" />
              News
            </Link>
          </li>
          <li>
            <Link to={`/popular`} onClick={handleHide}>
              <IconList className="ico small" />
              Popular
            </Link>
          </li>
        </ul>
        <DivHolder className="settings">
          <Link to="/settings" className="unfocus-link" onClick={handleHide}>
            <p>Settings</p>
            <IconSettings className="ico small" />
          </Link>
        </DivHolder>
      </DivHolder>
    </DivHolder>
  );
};

export default BurgerMenu;
