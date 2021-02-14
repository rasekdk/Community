import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { isExpired } from 'react-jwt';
import { useHistory } from 'react-router-dom';
import TopicList from '../follow/FollowList';

const FollowPage = () => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const expiredToken = isExpired(auth);
  const history = useHistory();
  const url = `${REACT_APP_URL}/t`;

  if (expiredToken || !auth) {
    history.push('/login');
  }
  return (
    <section className="div-holder main-section have-sub-header">
      <h1 className="text-center">Temas</h1>
      <TopicList url={url} auth={auth} follow="t" itemType="topic" />
    </section>
  );
};

export default FollowPage;
