import { useContext, useEffect, useState } from 'react';
import IconCross from '../icons/IconCross';
import DivHolder from '../visualComponents/DivHolder';
import { AuthContext } from '../providers/AuthProvider';
import IconLogo from '../icons/IconLogo';
import IconBack from '../icons/IconBack';
import IconDropDown from '../icons/IconDropDown';
import CommunitySelector from './CommunitySelector';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const ModalSwitch = ({ onClick }) => {
  const [modal, setModal] = useState(true);
  const [selectorModal, setSelectorModal] = useState(true);
  const [selector, setSelector] = useState(false);
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [canSend, setCanSend] = useState(false);
  const [charLeft, setCharLeft] = useState(250);

  console.log();

  const {
    formState: { isSubmitting },
  } = useForm();

  const history = useHistory();

  const hideModal = () => {
    setModal(!modal);
    setTimeout(() => {
      onClick();
    }, 400);
  };

  const useSelector = async () => {
    setSelector(!selector);
    if (selectorModal) {
      setSelectorModal(!selectorModal);
    }
    if (!selector) {
      getCommunities();
    }
  };

  const getCommunities = async () => {
    try {
      const res = await fetch(`${REACT_APP_URL}/c/f`, {
        method: 'GET',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      setCommunities(await json);
    } catch (err) {
      console.log(err);
    }
  };

  const selectCommunity = () => {
    setSelector(!selector);
    if (selectorModal) {
      setSelectorModal(!selectorModal);
    }
    if (!selector) {
      getCommunities();
    }
  };

  const useTextarea = (e) => {
    const charCount = e.target.value.length;
    setCharLeft(250 - charCount);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const res = await fetch(`${REACT_APP_URL}/c/${community}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const json = await res.json();
        setSelectedCommunity(await json);
      } catch (err) {
        console.log(err);
      }
    };
    getCommunity();
  }, [community, REACT_APP_URL]);

  useEffect(() => {
    if (community !== '' && title !== '' && charLeft < 250) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [community, title, charLeft]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = {
      postTitle: e.target[1].value,
      postContent: e.target[2].value,
      comId: e.target[0].value,
      postType: 'text',
    };
    try {
      const res = await fetch(`${REACT_APP_URL}/p`, {
        method: 'POST',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const [json] = await res.json();

      history.push(`/p/${json.threadId}`);
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className={modal ? 'modal-full open' : 'modal-full close'}
        onClick={hideModal}
      />
      <DivHolder
        className={modal ? 'modal modal-main open' : 'modal modal-main close'}
      >
        <header>
          <IconCross className="small ico" onClick={hideModal} />
          <h1 className="text-center">Post</h1>
        </header>
        <main className="post-form">
          <form onSubmit={onSubmit}>
            <div onClick={useSelector} className="community-selector">
              {community === '' ? (
                <div className="unfocus">
                  <IconLogo className="ico logo medium" />
                  <p>Elije una communidad</p>
                  <IconDropDown className="ico small" />
                </div>
              ) : (
                <div>
                  <img
                    src="https://source.unsplash.com/200x200/?portrait"
                    alt="avatar foto"
                    className="medium"
                  />
                  <p>{selectedCommunity[0].comName}</p>
                </div>
              )}
            </div>
            <input
              type="text"
              name="comId"
              value={community}
              style={{ display: 'none' }}
              readOnly
            />
            <input
              name="postTitle"
              className="create-post"
              type="text"
              onChange={handleTitleChange}
              placeholder="Título del post (Obligatorio)"
            />
            <textarea
              maxLength="250"
              name="postContent"
              className="create-post"
              onChange={useTextarea}
              placeholder="Contenido del post (Obligatorio)"
            />
            <p>{charLeft}</p>
            {canSend ? (
              <input type="submit" className={'send-post'} value="Enviar" />
            ) : (
              <input
                type="submit"
                className={'send-post disable'}
                value="Enviar"
                disabled
              />
            )}
          </form>
        </main>
      </DivHolder>
      {!selectorModal ? (
        <DivHolder
          className={
            !selector
              ? 'modal modal-selector close'
              : 'modal modal-selector open'
          }
        >
          <header>
            <IconBack className="small ico" onClick={useSelector} />
            <h1>Comunidades</h1>
            {/* <p className="send-post" onClick={sendPost}>
              Send
            </p> */}
          </header>
          <DivHolder>
            {communities.map((community) => (
              <CommunitySelector
                data={community}
                key={community.comId}
                handleClick={selectCommunity}
                className="community-block"
                setCommunity={setCommunity}
              />
            ))}
          </DivHolder>
        </DivHolder>
      ) : null}
    </div>
  );
};

export default ModalSwitch;
