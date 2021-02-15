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

const UserPage = ({ useModal }) => {
  const [auth] = useContext(AuthContext);

  const location = useLocation();

  const { REACT_APP_URL } = process.env;
  const currentUrl = location.pathname;
  const userUrl = `${REACT_APP_URL}${currentUrl}`;
  const postUrl = `${REACT_APP_URL}/p${currentUrl}`;
  const commentUrl = `${REACT_APP_URL}/c${currentUrl}`;

  const query = useQuery();
  const queryParam = query.get('page');

  const decodedToken = decodeToken(auth);

  const [user, setUser] = useRemoteData(userUrl);

  const [showModal, setShowModal] = useState(false);

  const openChangeAvatar = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return decodedToken ? (
    <section className={`user-page have-sub-header ${showModal ? 'no-scroll' : ''}`}>
      {showModal ? <AvatarModal showModal={showModal} setShowModal={setShowModal} setUser={setUser} /> : null}
      <header className="user-header">
        {user.userAvatar === 'avatar-img' ? (
          <IconUser className="ico logo large" />
        ) : (
          <img src={user.userAvatar} alt={`${user.userName} Avatar`} />
        )}
        <Link to={`/u/${user.userName}`}>u/{user.userName}</Link>
        {decodedToken.id === user.userId ? (
          <button to={'/change-avatar'} className="btn full" onClick={openChangeAvatar}>
            Cambiar el Avatar
          </button>
        ) : null}
      </header>
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
  ) : null;
};

export default UserPage;
