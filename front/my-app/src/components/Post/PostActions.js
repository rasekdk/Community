import IconShare from '../icons/IconShare.js';
import IconMore from '../icons/IconMore.js';
import LikeDislike from '../actions/LikeDislike';
import CreateComment from '../actions/CreateComment';
import { useState, useRef } from 'react';
import EditItem from '../actions/EditItem';
import EditPost from '../actions/EditPost';
import Options from '../actions/Options.js';
import CreatePostModal from '../Modals/CreatePostModal.js';

const PostActions = ({ data, setData, setComments, url }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const { REACT_APP_DOMAIN } = process.env;

  const [alertBox, setAlertBox] = useState(false);

  const postUrl = `${REACT_APP_DOMAIN}/p/${data.threadId}`;

  const useShare = () => {
    const url = document.createElement('textarea');
    url.innerText = postUrl;

    document.body.appendChild(url);
    url.select();
    document.execCommand('copy');
    url.remove();

    setAlertBox(true);
    setTimeout(() => setAlertBox(false), 500);
  };

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  return (
    <div className="post-actions">
      {alertBox ? (
        <div
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--dark-background-opacity)',
            top: '0',
            left: '0',
            zIndex: '999',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--dark-background)',
              padding: '1rem',
              borderRadius: '.5rem',
              zIndex: '999',
            }}
          >
            URL copiada
          </div>
        </div>
      ) : null}
      <LikeDislike data={data} />
      <CreateComment data={data} setPost={setData} setComments={setComments} />
      <div className="post-single-action" onClick={useShare}>
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
