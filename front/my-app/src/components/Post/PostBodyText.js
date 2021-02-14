import { useHistory } from 'react-router-dom';

const PostBodyImage = ({ data, type }) => {
  const url = `/p/${data.threadId}`;
  const history = useHistory();

  const currentLocation = history.location.pathname;

  const usePost = () => {
    if (currentLocation !== url) {
      history.push(url);
    }
  };
  return (
    <main className={type} onClick={usePost}>
      <h2>{data.postTitle}</h2>
      <p>{data.postContent}</p>
    </main>
  );
};

export default PostBodyImage;
