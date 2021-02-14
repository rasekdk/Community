import { useContext } from 'react';
import IconTrash from '../icons/IconTrash';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';
import { useHistory, useRouteMatch } from 'react-router-dom';

const DeleteItem = ({ data, setData }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const { REACT_APP_URL } = process.env;
  const location = useRouteMatch();
  const history = useHistory();
  const currentUrl = location.url;

  const reqUrl = !data.commentContent
    ? `${REACT_APP_URL}${currentUrl}`
    : `${REACT_APP_URL}/c${currentUrl}`;

  const useDelete = () => {
    const deleteItem = async () => {
      await fetch(`${REACT_APP_URL}/${data.threadId}`, {
        method: 'DELETE',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
      });

      const res = await fetch(reqUrl, {
        method: 'GET',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
      });

      const json = await res.json();
      location.path === '/p/:id' && !data.commentContent
        ? history.push('/')
        : setData(json);
    };
    deleteItem();
  };

  return data.userId === decodedToken.id ? (
    <li onClick={useDelete} className="option">
      <IconTrash className="ico small" /> Borrar
    </li>
  ) : null;
};

export default DeleteItem;
