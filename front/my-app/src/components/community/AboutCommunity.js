import { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useRemoteData from '../../hooks/useRemoteData';
import { AuthContext } from '../providers/AuthProvider';
import CommunityHeader from '../UserProfile/CommunityHeader';
import CommunityPostList from '../Post/CommunityPostList';
import AboutCommmunity from '../community/AboutCommunity';
import DivHolder from '../visualComponents/DivHolder';
import IconMore from '../icons/IconMore';
import OnlyEditOptions from '../actions/OnlyEditOption';
import { decodeToken } from 'react-jwt';

const AboutCommunity = ({ data, setData }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);

  const [optionsOpen, setOptionsOpen] = useState();

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  return (
    <section className="main-section about">
      <div className="columns">
        <DivHolder className="div-holder">
          <h1 className="text-center">Posts</h1>
          <h2 className="unfocus-text text-center">{data.posts}</h2>
        </DivHolder>
        <DivHolder className="div-holder">
          <h1 className="text-center">Follows</h1>
          <h2 className="unfocus-text text-center">{data.follows}</h2>
        </DivHolder>
      </div>
      <DivHolder className="div-holder">
        <h1>Bio</h1>
        <p className="unfocus-text">{data.comBio}</p>

        {decodedToken.id === data.comCreator ? (
          <div className="post-single-action">
            <IconMore className="ico small more" onClick={toggleOptions} />
            <OnlyEditOptions
              data={data}
              setData={setData}
              optionsOpen={optionsOpen}
              setOptionsOpen={setOptionsOpen}
              itemEdit={'biografía'}
              itemBody={'comBio'}
            />
          </div>
        ) : null}
      </DivHolder>
      <DivHolder className="div-holder">
        <h1 className="text-center">Temas</h1>
        <h2 className="unfocus-text text-center">{data.mainTopic}</h2>
        <h2 className="unfocus-text text-center">{data.secondTopic}</h2>
      </DivHolder>
    </section>
  );
};

export default AboutCommunity;
