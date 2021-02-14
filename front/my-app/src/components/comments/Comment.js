import DivHolder from '../visualComponents/DivHolder';
import IconMore from '../icons/IconMore.js';
import LikeDislike from '../actions/LikeDislike';
import CreateComment from '../actions/CreateComment';
import IconUser from '../icons/IconUser';
import { useState } from 'react';
import Options from '../actions/Options';
import useData from '../../hooks/useData';

const Comment = ({ data, setPost, setComments, onClick, user }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const timeAgo = useData(data.threadDate);

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  return (
    <DivHolder className={'comment div-holder'} id={data.threadId}>
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
            <p>
              comment by
              <a href={`/u/${data.userName}`} className="user-link link">
                {` u/${data.userName} `}
              </a>
            </p>
            <p>{`hace ${timeAgo}`}</p>
          </div>
        </div>
      </header>
      <p onClick={onClick} id={data.threadPost}>
        {data.commentContent}
      </p>
      <div className="post-actions">
        <LikeDislike data={data} />
        {data.threadComment === null ? <CreateComment data={data} setPost={setPost} setComments={setComments} /> : null}

        <div className="post-single-action">
          <IconMore className={`more ico small ${optionsOpen ? 'active' : null}`} onClick={toggleOptions} />
          <Options
            data={data}
            setComments={setComments}
            optionsOpen={optionsOpen}
            setOptionsOpen={setOptionsOpen}
            setData={setComments}
          ></Options>
        </div>
      </div>
      {data.comment
        ? data.comment.map((reply) => {
            return <Comment key={reply.threadId} data={reply} setPost={setPost} setComments={setComments} />;
          })
        : null}
    </DivHolder>
  );
};

export default Comment;
