// Components
import PostActions from './PostActions.js';
import PostBlock from './PostBlock.js';

const Post = ({ data, setPost, setComments, user, url }) => {
  return (
    <div className="post">
      <PostBlock data={data} user={user} />
      <PostActions data={data} setPost={setPost} setComments={setComments} url={url} />
    </div>
  );
};

export default Post;
