import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { isExpired } from 'react-jwt';
import { useHistory } from 'react-router-dom';
import FollowList from '../follow/FollowList';
import DivHolder from '../visualComponents/DivHolder';

const RegisterCommunityPage = () => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const expiredToken = isExpired(auth);
  const history = useHistory();
  const url = `${REACT_APP_URL}/c`;

  if (expiredToken || !auth) {
    history.push('/login');
  }

  return (
    <section className="div-holder topic-list main-section no-sub-header">
      <h1>Sigue alguna comunidad</h1>
      <DivHolder className=" div-holder-height">
        <FollowList url={url} auth={auth} follow="c" itemType="community" />
      </DivHolder>
      <button className="btn full" onClick={() => history.push('/')}>
        Siguiente
      </button>
    </section>
  );
};

export default RegisterCommunityPage;
