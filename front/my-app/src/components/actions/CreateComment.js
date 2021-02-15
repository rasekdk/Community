import IconComment from '../icons/IconComment.js';
import IconCross from '../icons/IconCross.js';
import DivHolder from '../visualComponents/DivHolder';

import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';

const CreateComment = ({ data, setPost, setComments }) => {
  const user = data.userName;
  const threadId = data.threadId;
  const threadPost = data.threadPost;
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const location = useRouteMatch();

  let url;

  threadPost
    ? (url = `${REACT_APP_URL}/comment/${threadPost}/${threadId}`)
    : (url = `${REACT_APP_URL}/comment/${threadId}`);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [modal, setModal] = useState(false);

  const [canSend, setCanSend] = useState(false);
  const [commentCount, setCommentCount] = useState();
  const [charLeft, setCharLeft] = useState(250);

  useEffect(() => setCommentCount(data.comments), [data]);

  const useTextarea = (e) => {
    const charCount = e.target.value.length;
    setCharLeft(250 - charCount);
  };

  useEffect(() => {
    if (charLeft < 250) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [charLeft]);

  const hideModal = () => {
    if (auth === '') {
      history.push('/register');
    } else {
      setModal(!modal);
      setTimeout(() => {
        setShowCommentModal(!showCommentModal);
        setCanSend(false);
      }, 400);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      commentContent: e.target[0].value,
    };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      location.path !== '/p/:id' ? history.push(`/p/${json.post[0].threadId}`) : setComments(json.comments);

      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="post-single-action" onClick={hideModal}>
        <IconComment className="vote comment ico small" />
        <p>{commentCount}</p>
      </div>
      {showCommentModal ? (
        <div>
          <div className={modal ? 'modal-full open' : 'modal-full close'} onClick={hideModal} />
          <DivHolder className={modal ? 'modal modal-comment open' : 'modal modal-comment close'}>
            <header>
              <IconCross className="small ico" onClick={hideModal} />
              <p>
                Contestando a{' '}
                <Link to={`/u/${user}`} className="link">
                  u/{user}
                </Link>
              </p>
            </header>
            <main className="post-form">
              <form onSubmit={onSubmit}>
                <textarea
                  maxLength="250"
                  name="postContent"
                  className="create-post"
                  onChange={useTextarea}
                  placeholder="Contenido del post (Obligatorio)"
                />
                <p>{charLeft}</p>
                {canSend ? (
                  <input type="submit" className={'send-post'} value="Enviar" />
                ) : (
                  <input type="submit" className={'send-post disable'} value="Enviar" disabled />
                )}
              </form>
            </main>
          </DivHolder>
        </div>
      ) : null}
    </div>
  );
};

export default CreateComment;
