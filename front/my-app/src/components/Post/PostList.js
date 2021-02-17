import { Link } from 'react-router-dom';
import DivHolder from '../visualComponents/DivHolder';
import useRemoteData from '../../hooks/useRemoteData';
import Post from '../Post/Post';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const PostList = ({ postUrl, user, useModal }) => {
  const [auth] = useContext(AuthContext);
  const [posts, setPosts] = useRemoteData(postUrl, auth);
  const postCount = posts.length;
  return (
    <section className="main-section">
      <p className="unfocus-text medium-text ">{!postCount ? '0' : postCount} posts</p>
      {posts[0] ? (
        posts.map((post) => <Post data={post} user={user} setPost={setPosts} key={post.threadId} />)
      ) : (
        <DivHolder className="div-holder error">
          <h1 className="text-center">Vaya!!</h1>
          <p className="text-center">
            Parece que <Link to={`/u/${user.userName}`}>u/{user.userName}</Link> no ha posteado nada aún
          </p>
          <div className="btn full" onClick={useModal}>
            Crea tu primer post
          </div>
        </DivHolder>
      )}
    </section>
  );
};

export default PostList;
