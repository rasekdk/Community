import { useLocation } from 'react-router';
import useRemoteData from '../../hooks/useRemoteData';
import useQuery from '../../hooks/useQuery';
import PostList from '../Post/PostList';
import IconUser from '../icons/IconUser';
import { AuthContext } from '../providers/AuthProvider';
import { useContext, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import MenuLink from '../header/MenuLink';
import CommentList from '../comments/CommentList';
import About from '../About';
import AvatarModal from '../UserProfile/AvatarModal';
import UserHeader from '../UserProfile/UserHeader';

const UserPage = ({ useModal }) => {
  const [auth] = useContext(AuthContext);

  const location = useLocation();

  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;
  const currentUrl = location.pathname;
  const userUrl = `${REACT_APP_URL}${currentUrl}`;
  const postUrl = `${REACT_APP_URL}/p${currentUrl}`;
  const commentUrl = `${REACT_APP_URL}/c${currentUrl}`;

  const query = useQuery();
  const queryParam = query.get('page');

  const decodedToken = decodeToken(auth);

  const [user, setUser] = useRemoteData(userUrl, auth);

  const [showModal, setShowModal] = useState(false);

  const openChangeAvatar = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <section className={`user-page have-sub-header ${showModal ? 'no-scroll' : ''}`}>
      {showModal ? <AvatarModal showModal={showModal} setShowModal={setShowModal} setUser={setUser} /> : null}
      <UserHeader user={user} decodedToken={decodedToken} openChangeAvatar={openChangeAvatar} />
      <section style={{ position: 'relative' }}>
        <header className="sub-header-home" style={{ position: 'absolute' }}>
          <ul>
            <MenuLink
              to={`${currentUrl}?page=post`}
              label="Post"
              className="link"
              activeOnlyWhenExact={true}
              active={queryParam === 'post' || !queryParam ? true : false}
            />
            <MenuLink
              to={`${currentUrl}?page=comments`}
              label="Commentarios"
              className="link"
              active={queryParam === 'comments' ? true : false}
            />
            <MenuLink
              to={`${currentUrl}?page=about`}
              label="About"
              className="link"
              active={queryParam === 'about' ? true : false}
            />
          </ul>
        </header>
        {queryParam === 'post' || !queryParam ? (
          <PostList postUrl={postUrl} user={user} className="main-section" useModal={useModal} />
        ) : queryParam === 'comments' ? (
          <CommentList commentUrl={commentUrl} user={user} />
        ) : queryParam === 'about' ? (
          <About data={user} setData={setUser} />
        ) : null}
      </section>
    </section>
  );
};

export default UserPage;
