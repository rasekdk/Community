import IconMore from './icons/IconMore';
import DivHolder from './visualComponents/DivHolder';

const About = ({ data }) => {
  const posts = data.posts;
  const comments = data.comments;
  const bio = data.userBio;
  const useOptions = () => {
    console.log('hola');
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
        <IconMore className="ico small options" onClick={useOptions} />
      </DivHolder>
    </section>
  );
};

export default About;
