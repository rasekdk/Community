import { useForm } from 'react-hook-form';
import IconDropDown from '../icons/IconDropDown';
import IconLogo from '../icons/IconLogo';
import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

const FormPost = ({
  hideModal,
  setCharLeft,
  setTitle,
  setSelectedFile,
  postType,
  selectedFile,
  useSelector,
  community,
  selectedCommunity,
  charLeft,
  canSend,
}) => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const [preview, setPreview] = useState();

  const history = useHistory();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const useTextarea = (e) => {
    const charCount = e.target.value.length;
    setCharLeft(250 - charCount);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append('postType', postType);
    formData.append('postTitle', e.postTitle);
    formData.append('postContent', e.postContent);
    formData.append('comId', community);

    if (postType === 'image') {
      formData.append('picture', e.picture[0]);
    }

    try {
      const res = await fetch(`${REACT_APP_URL}/p`, {
        method: 'POST',
        headers: {
          auth: auth,
        },
        body: formData,
      });
      const [json] = await res.json();

      history.push(`/p/${json.threadId}`);
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div onClick={useSelector} className="community-selector">
        {community === '' ? (
          <div className="unfocus">
            <IconLogo className="ico logo medium" />
            <p>Elije una communidad</p>
            <IconDropDown className="ico small" />
          </div>
        ) : (
          <div>
            {selectedCommunity[0].comAvatar === 'URL/' ? (
              <IconLogo className="ico logo medium" />
            ) : (
              <img src={selectedCommunity[0].comAvatar} alt={selectedCommunity[0].comName} />
            )}
            <p>{selectedCommunity[0].comName}</p>
          </div>
        )}
      </div>
      <input ref={register} type="text" name="comId" value={community} style={{ display: 'none' }} readOnly />
      <input
        ref={register}
        name="postTitle"
        className="create-post"
        type="text"
        onChange={handleTitleChange}
        placeholder="Título del post (Obligatorio)"
      />
      {postType === 'text' ? (
        <textarea
          ref={register}
          maxLength="250"
          name="postContent"
          className="create-post"
          onChange={useTextarea}
          placeholder="Contenido del post (Obligatorio)"
        />
      ) : null}
      {postType === 'text' ? <p>{charLeft}</p> : null}
      {selectedFile !== undefined && (
        <img
          src={preview}
          alt="preview"
          style={{ maxWidth: '100%', maxHeight: '20vh', objectFit: 'scale-down', marginTop: '1rem' }}
        />
      )}
      {postType === 'image' ? (
        <label htmlFor="picture" className="btn full" style={{ marginTop: '1rem' }}>
          Selecciona una Imagen
          <input ref={register} type="file" name="picture" id="picture" className="fileInput" onChange={onSelectFile} />
        </label>
      ) : null}
      {canSend ? (
        <input type="submit" className={'send-post'} value="Enviar" />
      ) : (
        <input type="submit" className={'send-post disable'} value="Enviar" disabled />
      )}
    </form>
  );
};

export default FormPost;
