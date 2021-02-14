import PostBodyText from './PostBodyText';
import PostBodyImage from './PostBodyImage';
import IconUser from '../icons/IconUser';

const PostBlock = ({ data, user }) => {
  return (
    <div className="post-block">
      <header>
        <div className="post-info">
          {user ? (
            user.userAvatar === 'avatar-img' ? (
              <IconUser className="ico logo small" />
            ) : (
              <img src={user.userAvatar} alt="avatar foto" />
            )
          ) : data.userAvatar === 'avatar-img' ? (
            <IconUser className="ico logo small" />
          ) : (
            <img src={data.userAvatar} alt="avatar foto" />
          )}
          <div className="post-creation">
            <a href={`/c/${data.comName}`} className="community-link link">
              {`c/${data.comName}`}
            </a>
            <p>
              posted by
              <a href={`/u/${data.userName}`} className="user-link link">
                {` u/${data.userName} `}
              </a>
              1 hour ago
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
