import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { isExpired } from 'react-jwt';
import { useHistory } from 'react-router-dom';
import FollowList from '../follow/FollowList';

const FollowPage = () => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const expiredToken = isExpired(auth);
  const history = useHistory();

  const url = `${REACT_APP_URL}/c`;

  if (expiredToken || !auth) {
    history.push('/login');
  }
  return (
    <section className="div-holder main-section have-sub-header">
      <h1 className="text-center">Comunidades</h1>
      <FollowList url={url} auth={auth} follow="c" itemType="community" />
    </section>
  );
};

export default FollowPage;
