import IconShare from '../icons/IconShare.js';
import IconMore from '../icons/IconMore.js';
import LikeDislike from '../actions/LikeDislike';
import CreateComment from '../actions/CreateComment';
import { useState } from 'react';
import EditItem from '../actions/EditItem';
import EditPost from '../actions/EditPost';
import Options from '../actions/Options.js';
import CreatePostModal from '../Modals/CreatePostModal.js';

const PostActions = ({ data, setData, setComments, url }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  return (
    <div className="post-actions">
      <LikeDislike data={data} />
      <CreateComment data={data} setPost={setData} setComments={setComments} />
      <div className="post-single-action">
        <IconShare className="share ico small" />
        <p>Share</p>
      </div>
      <div className="post-single-action">
        <IconMore className={`more ico small ${optionsOpen ? 'active' : null}`} onClick={toggleOptions} />
        <Options data={data} setData={setData} optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen} url={url}>
          <EditPost data={data} setData={setData} setOptionsOpen={setOptionsOpen} url={url} />
        </Options>
      </div>
    </div>
  );
};

export default PostActions;
