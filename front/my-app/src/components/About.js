import IconMore from './icons/IconMore';
import DivHolder from './visualComponents/DivHolder';
import OnlyEditOptions from './actions/OnlyEditOption';
import { useContext, useState } from 'react';
import { AuthContext } from './providers/AuthProvider';
import { decodeToken } from 'react-jwt';

const About = ({ data, setData }) => {
  const [auth] = useContext(AuthContext);
  const decodedToken = decodeToken(auth);
  const posts = data.posts;
  const comments = data.comments;
  const bio = data.userBio;

  const [optionsOpen, setOptionsOpen] = useState();

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  return (
    <section className="main-section about">
      <div className="columns">
        <DivHolder className="div-holder">
          <h1 className="text-center">Posts</h1>
          <h2 className="unfocus-text text-center">{posts}</h2>
        </DivHolder>
        <DivHolder className="div-holder">
          <h1 className="text-center">Comments</h1>
          <h2 className="unfocus-text text-center">{comments}</h2>
        </DivHolder>
      </div>
      <DivHolder className="div-holder">
        <h1>Bio</h1>
        <p className="unfocus-text">{bio}</p>

        {decodedToken.id === data.userId ? (
          <div className="post-single-action">
            <IconMore className="ico small more" onClick={toggleOptions} />
            <OnlyEditOptions
              data={data}
              setData={setData}
              optionsOpen={optionsOpen}
              setOptionsOpen={setOptionsOpen}
              itemEdit={'biografía'}
              itemBody={'userBio'}
            />
          </div>
        ) : null}
      </DivHolder>
    </section>
  );
};

export default About;
