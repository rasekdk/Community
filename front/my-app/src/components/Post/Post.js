// Components
import PostActions from './PostActions.js';
import PostBlock from './PostBlock.js';

const Post = ({ data, setData, setComments, user, url }) => {
  return (
    <div className="post">
      <PostBlock data={data} user={user} />
      <PostActions data={data} setData={setData} setComments={setComments} url={url} />
    </div>
  );
};

export default Post;
