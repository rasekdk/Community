import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { isExpired } from 'react-jwt';
import { useHistory } from 'react-router-dom';
import TopicList from '../follow/FollowList';
import DivHolder from '../visualComponents/DivHolder';

const RegisterTopicPage = () => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const expiredToken = isExpired(auth);
  const history = useHistory();
  const url = `${REACT_APP_URL}/t`;

  if (expiredToken || !auth) {
    history.push('/login');
  }

  return (
    <section className="div-holder topic-list main-section no-sub-header">
      <h1>Sigue algun tema</h1>
      <p>minimo 1 </p>
      <DivHolder className="div-holder-height">
        <TopicList url={url} auth={auth} follow="t" itemType="topic" />
      </DivHolder>
      <button
        className="btn full"
        onClick={() => history.push('/register/community')}
      >
        Siguiente
      </button>
    </section>
  );
};

export default RegisterTopicPage;
