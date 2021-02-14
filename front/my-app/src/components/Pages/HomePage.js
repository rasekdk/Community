import Post from '../Post/Post.js';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useRemoteData from '../../hooks/useRemoteData';
import DivHolder from '../visualComponents/DivHolder.js';

const HomePage = () => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const url = `${REACT_APP_URL}/`;
  const [posts, setPosts] = useRemoteData(url, auth);

  return (
    <section className="main-section have-sub-header">
      {posts[0] ? (
        posts.map((post) => (
          <Post data={post} setPost={setPosts} key={post.threadId} />
        ))
      ) : (
        <DivHolder className="div-holder error">
          <h1 className="text-center">Vaya!!</h1>
          <p className="text-center">
            Parece que no hay ningun post, sigue comunidades para ver más posts
          </p>
          <Link to={'/c'} className="btn full">
            Comunidades
          </Link>
        </DivHolder>
      )}
    </section>
  );
};

export default HomePage;
