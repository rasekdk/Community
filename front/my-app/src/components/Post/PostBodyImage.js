import { useHistory } from 'react-router-dom';

const PostBodyImage = ({ data, type, alt }) => {
  const { REACT_APP_URL_IMG } = process.env;
  const history = useHistory();
  const url = `/p/${data.threadId}`;

  const currentLocation = history.location.pathname;

  const usePost = () => {
    if (currentLocation !== url) {
      history.push(url);
    }
  };

  return (
    <main className={type} onClick={usePost}>
      <h2>{data.postTitle}</h2>
      <img src={`${REACT_APP_URL_IMG}${data.postContent}`} alt={alt} />
    </main>
  );
};

export default PostBodyImage;
