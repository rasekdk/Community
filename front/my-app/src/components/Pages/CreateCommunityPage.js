import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { decodeToken, isExpired } from 'react-jwt';
import { useHistory } from 'react-router-dom';
import IconDropDown from '../icons/IconDropDown';
import FollowList from '../follow/FollowList';
import SignButton from '../visualComponents/SignButton';
import Separator from '../visualComponents/Separator';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../forms/ErrorMessage';
import IconLogo from '../icons/IconLogo';
import IconTopic from '../icons/IconTopic';
import useRemoteData from '../../hooks/useRemoteData';

const CreateCommunityPage = () => {
  const { handleSubmit, register, errors } = useForm();
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const expiredToken = isExpired(auth);
  const history = useHistory();
  const url = `${REACT_APP_URL}/t/follow/${decodedToken.id}`;

  // Redirect
  if (!auth) {
    history.push('/register');
  } else if (expiredToken) {
    history.push('/login');
  }

  // Data
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedSecTopic, setSelectedSecTopic] = useState({});
  const [topics] = useRemoteData(url, auth);
  const [openMainSelector, setOpenMainSelector] = useState(false);
  const [openSecSelector, setOpenSecSelector] = useState(false);
  const [canSend, setCanSend] = useState(true);

  const secTopics = topics.filter((topic) => topic !== selectedTopic);

  const handleOpenSelector = () => {
    openMainSelector ? setOpenMainSelector(false) : setOpenMainSelector(true);
  };

  const handleOpenSecSelector = () => {
    setOpenSecSelector(!openSecSelector);
  };

  console.log(openMainSelector);

  useEffect(() => {
    selectedSecTopic === selectedTopic && setSelectedSecTopic({});
  }, [selectedTopic, selectedSecTopic]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append('comName', e.comName);
    formData.append('comBio', e.comBio);
    formData.append('comTopic', e.comTopicId);
    formData.append('comAvatar', e.picture[0]);

    e.comSecTopicId === '' ? formData.append('comSecTopic', 0) : formData.append('comSecTopic', e.comSecTopicId);

    try {
      const res = await fetch(`${REACT_APP_URL}/c`, {
        method: 'POST',
        headers: {
          auth: auth,
        },
        body: formData,
      });
      const [json] = await res.json();

      console.log(json);
      // history.push(`/c/${json.threadId}`);
      // hideModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="div-holder main-section have-sub-header flex-column flex-center">
      <h1 className="text-center" style={{ marginBottom: '1rem' }}>
        Crear comunidad
      </h1>

      {selectedFile !== undefined ? (
        <img
          src={preview}
          alt="preview"
          style={{
            height: '4rem',
            width: '4rem',
            objectFit: 'cover',
            borderRadius: '50%',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        />
      ) : (
        <IconLogo className="ico logo large" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <fieldset>
          <label htmlFor="picture" className="btn full" style={{ marginTop: '1rem' }}>
            Selecciona una Imagen
            <input
              ref={register}
              type="file"
              name="picture"
              id="picture"
              className="fileInput"
              onChange={onSelectFile}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Nombre de la comunidad
            <ErrorMessage className="error-message" error={errors.comName} />
          </label>
          <input
            type="text"
            name="comName"
            placeholder="Nombre de la comunidad"
            ref={register({
              required: true,
            })}
          />
        </fieldset>
        <div className="community-selector">
          <div onClick={handleOpenSelector}>
            <p className="unfocus-text">
              {selectedTopic.topicName ? selectedTopic.topicName : 'Elije el tema principal'}
            </p>
            <IconDropDown className="ico small" />
            <input
              ref={register}
              type="text"
              name="comTopicId"
              value={selectedTopic.topicId}
              style={{ display: 'none' }}
              readOnly
            />
          </div>
          {openMainSelector ? (
            <div>
              {topics.map((topic) => (
                <div key={topic.topicId} onClick={() => handleOpenSelector(setSelectedTopic(topic))}>
                  {topic.topicName}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="community-selector">
          <div onClick={handleOpenSecSelector}>
            <p className="unfocus-text">
              {selectedSecTopic.topicName ? selectedSecTopic.topicName : 'Elije el tema secundario'}
            </p>
            <IconDropDown className="ico small" />
            <input
              ref={register}
              type="text"
              name="comSecTopicId"
              value={selectedSecTopic.topicId}
              style={{ display: 'none' }}
              readOnly
            />
          </div>
          {openSecSelector ? (
            <div>
              {secTopics.map((topic) => (
                <div key={topic.topicId} onClick={() => handleOpenSecSelector(setSelectedSecTopic(topic))}>
                  {topic.topicName}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <fieldset>
          <label>Biografía de la comunidad</label>
          <textarea
            ref={register({
              required: true,
            })}
            maxLength="250"
            name="comBio"
            placeholder="Biografía (Obligatorio)"
          />
        </fieldset>
        {canSend ? (
          <input type="submit" className={'btn full'} value="Enviar" />
        ) : (
          <input type="submit" className={'btn full disable'} value="Enviar" disabled />
        )}
      </form>
    </section>
  );
};

export default CreateCommunityPage;
