import UserHeader from '../UserProfile/UserHeader';
import DivHolder from '../visualComponents/DivHolder';
import SignButton from '../visualComponents/SignButton';
import SignLink from '../visualComponents/SignLink';
import Separator from '../visualComponents/Separator';
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
import IconSettings from '../icons/IconSettings';
import { Link } from 'react-router-dom';

const BurgerMenu = ({ hideModal, modalHandler, setColor }) => {
  const [modal, setModal] = useState(false);

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
      <DivHolder className={modal ? 'burger-menu open no-logged' : 'burger-menu close no-logged'}>
        <header className="user-header">
          <IconCross className="ico small" onClick={handleHide} />
          <SignButton link="/register" onClick={handleHide}>
            {' '}
            Registrate
          </SignButton>
          <Separator />
          <SignLink link="/login" onClick={handleHide}>
            Accede
          </SignLink>
        </header>
        <ul className="menu-list">
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
