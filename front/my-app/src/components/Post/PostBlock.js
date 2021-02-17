import PostBodyText from './PostBodyText';
import PostBodyImage from './PostBodyImage';
import IconUser from '../icons/IconUser';
import useData from '../../hooks/useData';
import { Link } from 'react-router-dom';

const PostBlock = ({ data, user }) => {
  const timeAgo = useData(data.threadDate);
  const { REACT_APP_URL_IMG } = process.env;

  return (
    <div className="post-block">
      <header>
        <div className="post-info">
          {user ? (
            user.userAvatar === 'avatar-img' ? (
              <IconUser className="ico logo s-m" />
            ) : (
              <img src={`${REACT_APP_URL_IMG}/${user.userAvatar}`} alt="avatar foto" />
            )
          ) : data.userAvatar === 'avatar-img' || !data.userAvatar ? (
            <IconUser className="ico logo s-m" />
          ) : (
            <img src={`${REACT_APP_URL_IMG}/${data.userAvatar}`} alt="avatar foto" />
          )}
          <div className="post-creation">
            <Link to={`/c/${data.name}`} className="community-link link">
              {`c/${data.comName}`}
            </Link>
            <p>
              creado por
              <Link to={`/u/${data.userName}`} className="user-link link">
                {` u/${data.userName} `}
              </Link>
              {`hace ${timeAgo}`}
            </p>
          </div>
        </div>
      </header>

      {data.postType === 'text' ? (
        <PostBodyText data={data} type={data.postType} />
      ) : (
        <PostBodyImage data={data} type={data.postType} alt={data.postTitle} />
      )}
    </div>
  );
};

export default PostBlock;
