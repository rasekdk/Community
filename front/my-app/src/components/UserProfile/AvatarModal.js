import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRemoteData from '../../hooks/useRemoteData';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import DivHolder from '../visualComponents/DivHolder';
import Separator from '../visualComponents/Separator';

const AvatarModal = ({ setShowModal, showModal, setUser }) => {
  const { REACT_APP_URL } = process.env;
  const location = useLocation();
  const [auth] = useContext(AuthContext);

  const [avatars] = useRemoteData(`${REACT_APP_URL}/t/img`, auth);
  const [file, setFile] = useState(null);

  const hideModal = () => {
    setShowModal(!showModal);
  };

  const selectDefaultAvatar = (e) => {
    const src = e.target.src;
    let url = src;
    let parser = document.createElement('a');
    parser.href = url;

    const newAvatar = {
      userAvatar: `${parser.pathname}`,
    };

    const updateData = async () => {
      const res = await fetch(`${REACT_APP_URL}${location.pathname}`, {
        method: 'PUT',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newAvatar),
      });
      const json = await res.json();

      setUser(json);
      setShowModal(!showModal);
    };
    updateData();
  };

  const uploadAvatar = (e) => {
    const f = e.target.files[0];
    setFile(f);

    const updateData = async () => {
      const res = await fetch(`${REACT_APP_URL}${location.pathname}`, {
        method: 'PUT',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: file,
      });
    };
  };

  return (
    <div className="modal-block">
      <div className="modal-full" onClick={hideModal} />
      <DivHolder
        className={
          showModal ? 'modal modal-main open ' : 'modal modal-main close'
        }
      >
        <header>
          <IconCross className="small ico" onClick={hideModal} />
          <h1 className="text-center align">Cambiar Avatar</h1>
        </header>
        <main>
          <label htmlFor="avatarUpload" className="btn full">
            Selecciona una imagen
          </label>
          <input
            id="avatarUpload"
            type="file"
            className="fileInput"
            onChange={uploadAvatar}
          />
          <Separator />
          <p className="text-center">Escoje una de las siguientes imagenes</p>
          <section className="avatar-grid">
            {avatars.map((avatar) => (
              <DivHolder className="avatar-selector" key={avatar.url}>
                <img
                  src={avatar.url}
                  alt={`avatar ${avatar.topicName}`}
                  onClick={selectDefaultAvatar}
                />
              </DivHolder>
            ))}
          </section>
        </main>
      </DivHolder>
    </div>
  );
};

export default AvatarModal;
