import { useContext, useEffect, useState } from 'react';
import IconPost from '../icons/IconPost';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken } from 'react-jwt';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CreatePostModal from '../Modals/CreatePostModal';

const EditPost = ({ data, setData, setOptionsOpen }) => {
  const [canSend, setCanSend] = useState(false);
  const { REACT_APP_URL } = process.env;
  const location = useRouteMatch();
  const history = useHistory();

  const currentUrl = location.url;
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const [postModal, setPostModal] = useState(false);

  const url = `${REACT_APP_URL}/p/${data.threadId}`;

  const usePostModal = () => {
    setPostModal(!postModal);
    setOptionsOpen(!postModal);
  };

  return data.userId === decodedToken.id ? (
    <li className="option">
      <p onClick={usePostModal}>
        <IconPost className="ico small" />
        Editar
      </p>
      {postModal ? (
        <CreatePostModal method={'PUT'} hideModal={usePostModal} modalHandler={postModal} url={url} setData={setData} />
      ) : null}
    </li>
  ) : null;
};

export default EditPost;
