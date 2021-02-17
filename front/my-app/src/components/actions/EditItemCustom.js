import { useContext, useState } from 'react';
import IconPost from '../icons/IconPost';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';
import { useHistory, useRouteMatch } from 'react-router-dom';

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

  console.log(location.path);

  const url = location.path === '/u/:id' ? `${REACT_APP_URL}${currentUrl}` : `${REACT_APP_URL}/edit${currentUrl}`;

  const reqUrl = `${REACT_APP_URL}${currentUrl}`;

  const useEdit = () => {
    setShowCommentModal(!showCommentModal);
    setModal(!modal);
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
    e.preventDefault();
    let body;

    if (itemBody === 'comBio') {
      body = {
        comBio: e.target[0].value,
      };
    } else if (itemBody === 'userBio') {
      body = {
        userBio: e.target[0].value,
      };
    }

    await fetch(url, {
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
    await setData(json);
    hideModal();
  };

  return data.userId === decodedToken.id || data.comCreator === decodedToken.id ? (
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
