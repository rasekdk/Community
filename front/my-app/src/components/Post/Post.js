// Components
import PostActions from './PostActions.js';
import PostBlock from './PostBlock.js';

const Post = ({ data, setPost, setComments, user }) => {
  return (
    <div className="post">
      <PostBlock data={data} user={user} />
      <PostActions data={data} setPost={setPost} setComments={setComments} />
    </div>
  );
};

export default Post;
