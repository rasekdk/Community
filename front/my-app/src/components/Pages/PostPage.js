import { useHistory, useLocation } from 'react-router';
import useRemoteData from '../../hooks/useRemoteData';
import Post from '../Post/Post';
import Comment from '../comments/Comment';

const PostPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { REACT_APP_URL } = process.env;
  const currentUrl = location.pathname;
  const urlPost = `${REACT_APP_URL}${currentUrl}`;
  const urlComments = `${REACT_APP_URL}/c${currentUrl}`;
  const [comments, setComments] = useRemoteData(urlComments);
  const [post, setPost] = useRemoteData(urlPost);

  //
  if (post.error) {
    history.push('/404');
  }

  return (
    <section className="main-section have-sub-header">
      <Post
        key={post.threadId}
        id={post.threadId}
        data={post}
        setData={setPost}
        setComments={setComments}
        url={urlPost}
      />
      {comments.map((comment) => (
        <Comment
          key={comment.threadId}
          id={comment.threadId}
          data={comment}
          setData={setComments}
          setComments={setComments}
          url={urlComments}
        />
      ))}
    </section>
  );
};

export default PostPage;
