import useRemoteData from '../../hooks/useRemoteData';
import Comment from './Comment';
import { useHistory } from 'react-router-dom';

const CommentList = ({ commentUrl, user }) => {
  const [comments, setComments] = useRemoteData(commentUrl);
  const commentCount = comments.length;
  const history = useHistory();

  const openPost = (e) => {
    history.push(`/p/${e.target.id}`);
  };

  return (
    <section className="main-section">
      <p className="unfocus-text medium-text">{commentCount} comentarios</p>
      {comments.map((comment) => (
        <Comment
          data={comment}
          setData={setComments}
          key={comment.threadId}
          id={comment.threadId}
          onClick={openPost}
          user={user}
        />
      ))}
    </section>
  );
};

export default CommentList;
