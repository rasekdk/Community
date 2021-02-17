import { useContext, useEffect, useState } from 'react';
import IconCross from '../icons/IconCross';
import DivHolder from '../visualComponents/DivHolder';
import { AuthContext } from '../providers/AuthProvider';
import IconBack from '../icons/IconBack';
import CommunitySelector from './CommunitySelector';
import FormPost from './FormPost';

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
  const [canSend, setCanSend] = useState(false);
  const [charLeft, setCharLeft] = useState(250);
  const [postType, setPostType] = useState('text');
  const [selectedFile, setSelectedFile] = useState();

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
    if (postType === 'text') {
      if (community !== '' && title !== '' && charLeft < 250) {
        setCanSend(true);
      } else {
        setCanSend(false);
      }
    } else if (postType === 'image') {
      if (community !== '' && title !== '' && selectedFile) {
        setCanSend(true);
      } else {
        setCanSend(false);
      }
    }
  }, [community, title, charLeft, selectedFile, postType]);

  return (
    <div>
      <div className={modal ? 'modal-full open' : 'modal-full close'} onClick={hideModal} />
      <DivHolder className={modal ? 'modal modal-main open' : 'modal modal-main close'}>
        <header>
          <IconCross className="small ico" onClick={hideModal} />
          <h1 className="text-center">Post</h1>
        </header>
        <main className="post-form">
          <div className="sub-header-modal">
            <ul>
              <li
                to="/new"
                className={`link ${postType === 'text' ? 'active' : 'unfocus'}`}
                onClick={() => {
                  setPostType('text');
                  setSelectedFile(undefined);
                }}
              >
                Text
              </li>
              <li
                to="/new"
                className={`link ${postType === 'image' ? 'active' : 'unfocus'}`}
                onClick={() => {
                  setPostType('image');
                }}
              >
                Image
              </li>
            </ul>
          </div>
          <FormPost
            hideModal={hideModal}
            setCharLeft={setCharLeft}
            setTitle={setTitle}
            setSelectedFile={setSelectedFile}
            postType={postType}
            selectedFile={selectedFile}
            useSelector={useSelector}
            community={community}
            selectedCommunity={selectedCommunity}
            charLeft={charLeft}
            canSend={canSend}
          />
        </main>
      </DivHolder>
      {!selectorModal ? (
        <DivHolder className={!selector ? 'modal modal-selector close' : 'modal modal-selector open'}>
          <header>
            <IconBack className="small ico" onClick={useSelector} />
            <h1>Comunidades</h1>
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
