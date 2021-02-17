import IconLogo from '../icons/IconLogo';
import DivHolder from '../visualComponents/DivHolder';

const CommunitySelector = ({ data, handleClick, className, setCommunity }) => {
  const getCommunity = () => {
    setCommunity(data);
    handleClick();
  };

  const { REACT_APP_URL_IMG } = process.env;

  const imgUrl = `${REACT_APP_URL_IMG}/${data.comAvatar}`;

  return (
    <DivHolder className={className} onClick={getCommunity}>
      {data.comAvatar === 'avatar-img' ? (
        <IconLogo className="ico logo medium" />
      ) : (
        <img src={imgUrl} alt={data.comName} className="ico medium logo" />
      )}
      <p>{data.comName}</p>
    </DivHolder>
  );
};

export default CommunitySelector;
