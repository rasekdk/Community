import { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useRemoteData from '../../hooks/useRemoteData';
import { AuthContext } from '../providers/AuthProvider';
import DivHolder from '../visualComponents/DivHolder';
import { Link } from 'react-router-dom';
import Post from '../Post/Post';

const CommunityPostList = () => {
  const [auth] = useContext(AuthContext);
  const location = useRouteMatch();

  const { REACT_APP_URL } = process.env;

  const url = `${REACT_APP_URL}/p${location.url}`;

  const [posts, setPosts] = useRemoteData(url, auth);
  const postCount = posts.length;

  return (
    <section className="main-section">
      <p className="unfocus-text medium-text ">{!postCount ? '0' : postCount} posts</p>
      {posts[0] ? (
        posts.map((post) => <Post data={post} setPost={setPosts} key={post.threadId} url={url} />)
      ) : (
        <DivHolder className="div-holder error">
          <h1 className="text-center">Vaya!!</h1>
          <p className="text-center">Parece que no hay ningun post, unete a la comundad y se el primero</p>
          <Link to={'/c'} className="btn full">
            Comunidades
          </Link>
        </DivHolder>
      )}
    </section>
  );
};

export default CommunityPostList;
