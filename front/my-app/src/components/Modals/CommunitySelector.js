import IconLogo from '../icons/IconLogo';
import DivHolder from '../visualComponents/DivHolder';

const CommunitySelector = ({ data, handleClick, className, setCommunity }) => {
  const getCommunity = () => {
    setCommunity(data.comId);
    handleClick();
  };
  return (
    <DivHolder className={className} onClick={getCommunity}>
      {data.comAvatar === 'URL/' ? (
        <IconLogo className="ico logo medium" />
      ) : (
        <img src={data.comAvatar} alt={data.comName} />
      )}
      <p>{data.comName}</p>
    </DivHolder>
  );
};

export default CommunitySelector;
