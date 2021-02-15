import { useContext, useState } from 'react';
import IconPost from '../icons/IconPost';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';

const EditItem = ({ data, setData, setOptionsOpen, itemEdit, itemBody }) => {
  const [canSend, setCanSend] = useState(false);
  const { REACT_APP_URL } = process.env;
  const location = useRouteMatch();
  const history = useHistory();

  const currentUrl = location.url;
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const [modal, setModal] = useState(false);

  const editUrl = !data.commentContent ? `${REACT_APP_URL}/p/${data.threadId}` : `${REACT_APP_URL}/c/${data.threadId}`;
  const reqUrl = !data.commentContent ? `${REACT_APP_URL}/p${currentUrl}` : `${REACT_APP_URL}/c${currentUrl}`;

  const useEdit = () => {
    setShowCommentModal(!showCommentModal);
    setModal(!modal);
  };

  const handelEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendEdit(e);
    }
  };

  const hideModal = () => {
    if (auth === '') {
      history.push('/register');
    } else {
      setModal(!modal);
      setTimeout(() => {
        setShowCommentModal(false);
        setOptionsOpen(false);
      }, 400);
    }
  };

  const handelChange = (e) => {
    e.target.value === '' ? setCanSend(false) : setCanSend(true);
  };

  const sendEdit = async (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    const body = {
      data: e.target[0].value,
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

  return data.userId === decodedToken.id ? (
    <li className="option">
      <p onClick={useEdit}>
        <IconPost className="ico small" />
        Editar
      </p>
      {showCommentModal ? (
        <div>
          <div className={modal ? 'modal-full open' : 'modal-full close'} onClick={hideModal} />
          <div className={modal ? 'modal modal-comment open' : 'modal modal-comment close'}>
            <header>
              <IconCross className="small ico" onClick={hideModal} />
              <p>Editando {itemEdit}</p>
            </header>
            <main className="post-form">
              <form onSubmit={sendEdit}>
                <label>Texto de {itemEdit}</label>
                <textarea
                  maxLength="250"
                  name="commentContent"
                  placeholder={`Edita el texto de ${itemEdit}`}
                  className="create-post"
                  onChange={handelChange}
                />
                <input type="submit" className={`send-post ${canSend ? null : 'diasble'}`} value="Enviar" />
              </form>
            </main>
          </div>
        </div>
      ) : null}
    </li>
  ) : null;
};

export default EditItem;
