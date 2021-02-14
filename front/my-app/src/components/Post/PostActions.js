import IconShare from '../icons/IconShare.js';
import IconMore from '../icons/IconMore.js';
import LikeDislike from '../actions/LikeDislike';
import CreateComment from '../actions/CreateComment';
import { useState } from 'react';
import Options from '../actions/Options.js';

const PostActions = ({ data, setPost, setComments }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  return (
    <div className="post-actions">
      <LikeDislike data={data} />
      <CreateComment data={data} setPost={setPost} setComments={setComments} />
      <div className="post-single-action">
        <IconShare className="share ico small" />
        <p>Share</p>
      </div>
      <div className="post-single-action">
        <IconMore
          className={`more ico small ${optionsOpen ? 'active' : null}`}
          onClick={toggleOptions}
        />
        <Options
          data={data}
          setData={setPost}
          optionsOpen={optionsOpen}
          setOptionsOpen={setOptionsOpen}
        ></Options>
      </div>
    </div>
  );
};

export default PostActions;
