import DivHolder from '../visualComponents/DivHolder';

const CommunitySelector = ({ data, handleClick, className, setCommunity }) => {
  const getCommunity = () => {
    setCommunity(data.comId);
    handleClick();
  };
  return (
    <DivHolder className={className} onClick={getCommunity}>
      <img
        src="https://source.unsplash.com/200x200/?portrait"
        alt="avatar foto"
        className="medium"
      />
      <p>{data.comName}</p>
    </DivHolder>
  );
};

export default CommunitySelector;
