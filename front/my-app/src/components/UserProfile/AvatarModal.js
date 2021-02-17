import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import useRemoteData from '../../hooks/useRemoteData';
import IconCross from '../icons/IconCross';
import { AuthContext } from '../providers/AuthProvider';
import DivHolder from '../visualComponents/DivHolder';
import Separator from '../visualComponents/Separator';

const AvatarModal = ({ setShowModal, showModal, setUser }) => {
  const { register, handleSubmit } = useForm();
  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;
  const location = useLocation();
  const [auth, setAuth] = useContext(AuthContext);

  const [avatars] = useRemoteData(`${REACT_APP_URL}/t/img`, auth);

  const hideModal = () => {
    setShowModal(!showModal);
  };

  const selectDefaultAvatar = (e) => {
    const src = e.target.src;

    const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('');

    const url = diff(src, REACT_APP_URL_IMG);

    const newAvatar = {
      userAvatar: `${url}`,
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

      setUser(json.user);
      setAuth(json.auth);
      setShowModal(!showModal);
    };
    updateData();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('picture', data.picture[0]);

    console.log(formData);

    const res = await fetch(`${REACT_APP_URL}/avatar/u`, {
      method: 'POST',
      headers: {
        auth: auth,
      },
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    if (json.status !== false) {
      setAuth(json.auth);
      setUser(json.user);
    }
    hideModal();
  };

  return (
    <div className="modal-block">
      <div className="modal-full" onClick={hideModal} />
      <DivHolder className={showModal ? 'modal modal-main open ' : 'modal modal-main close'}>
        <header>
          <IconCross className="small ico" onClick={hideModal} />
          <h1 className="text-center align">Cambiar Avatar</h1>
        </header>
        <main>
          <form>
            <label htmlFor="picture" className="btn full">
              Selecciona una imagen
            </label>
            <input
              ref={register}
              type="file"
              name="picture"
              id="picture"
              className="fileInput"
              onChange={handleSubmit(onSubmit)}
            />
          </form>
          <Separator />
          <p className="text-center">Escoje una de las siguientes imagenes</p>
          <section className="avatar-grid">
            {avatars.map((avatar) => (
              <DivHolder className="avatar-selector" key={avatar.url}>
                <img
                  src={`${REACT_APP_URL_IMG}${avatar.url}`}
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
