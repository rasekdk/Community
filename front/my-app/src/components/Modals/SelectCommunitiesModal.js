import IconBack from '../icons/IconBack';
import CommunitySelector from './CommunitySelector';
import DivHolder from '../visualComponents/DivHolder';

const SelectCommunitiesModal = ({
  selectorModal,
  selector,
  useSelector,
  communities,
  selectCommunity,
  setCommunity,
  modal,
}) => {
  return selectorModal ? (
    <DivHolder className={!selector || !modal ? 'modal modal-selector close' : 'modal modal-selector open'}>
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
  ) : null;
};

export default SelectCommunitiesModal;
