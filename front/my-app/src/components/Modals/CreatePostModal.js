// React
import { useContext, useEffect, useState } from 'react';

// Providers
import { AuthContext } from '../providers/AuthProvider';

// Componentes
import CreatePostModalHeader from './CreatePostModalHeader';
import SelectCommunitiesModal from './SelectCommunitiesModal';
import DivHolder from '../visualComponents/DivHolder';
import FormPost from './FormPost';

// Icons
import IconCross from '../icons/IconCross';

// Hooks
import useScroll from '../../hooks/useScroll.js';

const CreatePostModal = ({ method, hideModal, modalHandler, url, setData }) => {
  // Variables
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);

  // Modal controllers
  const [modal, setModal] = useState(modalHandler);
  const [selector, setSelector] = useState(false);
  const [selectorModal, setSelectorModal] = useState(false);

  // Data
  const [postType, setPostType] = useState('text');
  const [selectedFile, setSelectedFile] = useState();
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState([]);
  const [title, setTitle] = useState('');
  const [canSend, setCanSend] = useState(false);
  const [charLeft, setCharLeft] = useState(250);

  useScroll(modal);

  // Change modal state
  useEffect(() => {
    setModal(modalHandler);
    console.log(modalHandler);
  }, [modalHandler]);

  const handleHide = () => {
    setModal(!modal);
    setTimeout(() => hideModal(), 400);
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

  const useSelector = async () => {
    setSelector(!selector);
    if (selector) {
      setTimeout(() => setSelectorModal(!selectorModal), 400);
    }
    if (!selector) {
      getCommunities();
      setSelectorModal(!selectorModal);
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
      setSelectedCommunity(community);
      try {
        const res = await fetch(`${REACT_APP_URL}/c/${community.comId}`, {
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
      <div className={modal ? 'modal-full open' : 'modal-full close'} onClick={handleHide} />
      <div>
        <DivHolder className={modal ? 'modal modal-main open' : 'modal modal-main close'}>
          <header>
            <IconCross className="small ico" onClick={hideModal} />
            <h1 className="text-center">Post</h1>
          </header>
          <main className="post-form">
            <CreatePostModalHeader postType={postType} setPostType={setPostType} setSelectedFile={setSelectedFile} />
            <FormPost
              method={method}
              url={url}
              setData={setData}
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
        <SelectCommunitiesModal
          selectorModal={selectorModal}
          selector={selector}
          useSelector={useSelector}
          communities={communities}
          selectCommunity={selectCommunity}
          setCommunity={setCommunity}
          modal={modal}
        />
      </div>
    </div>
  );
};

export default CreatePostModal;
