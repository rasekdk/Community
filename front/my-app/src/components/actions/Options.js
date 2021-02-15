import { useContext, useState } from 'react';
import IconFlag from '../icons/IconFlag';
import IconPost from '../icons/IconPost';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import DeleteItem from './DeleteItem';

const Options = ({ data, setData, optionsOpen, setOptionsOpen }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const { REACT_APP_URL } = process.env;
  const location = useRouteMatch();
  const history = useHistory();

  const currentUrl = location.url;

  const editUrl = !data.commentContent ? `${REACT_APP_URL}/p/${data.threadId}` : `${REACT_APP_URL}/c/${data.threadId}`;
  const reqUrl = !data.commentContent ? `${REACT_APP_URL}/p${currentUrl}` : `${REACT_APP_URL}/c${currentUrl}`;

  const hideOption = () => {
    setOptionsOpen(false);
  };

  const sendEdit = async (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    const body = !data.commentContent
      ? {
          postTitle: e.target[0].value,
          postContent: e.target[1].value,
          postType: '',
          comId: '',
        }
      : {
          commentContent: e.target[0].value,
        };

    await fetch(editUrl, {
      method: 'PUT',
      headers: {
        auth: auth,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const res = await fetch(reqUrl, {
      method: 'GET',
      headers: {
        auth: auth,
        'Content-type': 'application/json',
      },
    });

    const json = await res.json();

    console.log(json);
    location.path === '/p/:id' && !data.commentContent ? history.push('/') : await setData(json);
    hideModal();
  };

  const handelChange = (e) => {
    e.target.value === '' ? setCanSend(false) : setCanSend(true);
  };

  const handelEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendEdit(e);
    }
  };

  const useEdit = () => {
    setShowCommentModal(!showCommentModal);
  };

  const hideModal = () => {
    setShowCommentModal(false);
    setOptionsOpen(false);
  };

  return optionsOpen ? (
    <div>
      <div className="modal-full options" onClick={hideOption} />
      <ul className="more-options">
        {data.userId === decodedToken.id ? (
          <li className="option" onClick={useEdit}>
            <IconPost className="ico small" />
            Editar
          </li>
        ) : null}
        <DeleteItem data={data} setData={setData} />
        <li className="option">
          <IconFlag className="ico small" />
          Reportar
        </li>
      </ul>
      {showCommentModal ? (
        <div>
          <div className="modal-full" onClick={hideModal} />
          <div className="modal modal-comment">
            <header>
              <IconCross className="small ico" onClick={hideModal} />
              <p>Editando post</p>
            </header>
            <main className="post-form">
              <form className="comment-form" onSubmit={sendEdit}>
                <label>Texto del comentario</label>
                <input
                  name="commentContent"
                  type="text-area"
                  placeholder="Edita el comentario"
                  onChange={handelChange}
                  onKeyDown={handelEnter}
                  className=""
                />
                <input type="submit" className={`send-post ${canSend ? null : 'diasble'}`} value="Enviar" />
              </form>
            </main>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Options;
