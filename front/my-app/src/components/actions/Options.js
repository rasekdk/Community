import { useContext, useState } from 'react';
import IconFlag from '../icons/IconFlag';
import IconPost from '../icons/IconPost';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import DeleteItem from './DeleteItem';

const Options = ({ data, optionsOpen, setOptionsOpen, setData }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [canSend, setCanSend] = useState(false);

  const hideOption = () => {
    setOptionsOpen(false);
  };

  const sendEdit = (e) => {
    console.log(e);
  };

  const handelChange = (e) => {
    e.target.value === '' ? setCanSend(false) : setCanSend(true);
    console.log(e.target.value);
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

  const useCloseModal = () => {
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
          <div className="modal-full" onClick={useCloseModal} />
          <div className="modal modal-comment">
            <header>
              <IconCross className="small ico" onClick={useCloseModal} />
              <p>Editando post</p>
            </header>
            <form className="comment-form" onSubmit={sendEdit}>
              <fieldset className="post-form">
                <label>Comentario</label>
                <input
                  name="commentContent"
                  type="text-area"
                  placeholder="Añade un comentario"
                  onChange={handelChange}
                  onKeyDown={handelEnter}
                  className=""
                />
              </fieldset>
              <input
                type="submit"
                className={`send-post ${canSend ? null : 'diasble'}`}
                value="Enviar"
              />
            </form>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Options;
