import Post from '../Post/Post.js';
import useRemoteData from '../../hooks/useRemoteData';

const NewsPage = () => {
  const { REACT_APP_URL } = process.env;
  const url = `${REACT_APP_URL}/new`;
  const [posts, setPosts] = useRemoteData(url);

  return (
    <section className="main-section have-sub-header">
      {posts.map((post) => (
        <Post data={post} setPost={setPosts} key={post.threadId} />
      ))}
    </section>
  );
};

export default NewsPage;
