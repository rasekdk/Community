import useRemoteData from '../../hooks/useRemoteData';
import Post from '../Post/Post.js';

const PopularPage = () => {
  const { REACT_APP_URL } = process.env;
  const url = `${REACT_APP_URL}/popular`;
  const [posts, setPost] = useRemoteData(url);

  return (
    <section className="main-section have-sub-header">
      {posts.map((post) => (
        <Post data={post} setPost={setPost} key={post.threadId} />
      ))}
    </section>
  );
};

export default PopularPage;
