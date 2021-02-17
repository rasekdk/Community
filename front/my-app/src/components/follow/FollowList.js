import useRemoteData from '../../hooks/useRemoteData';
import IconTopic from '../icons/IconTopic';
import IconLogo from '../icons/IconLogo';

import { Link, useHistory } from 'react-router-dom';
import IconCommunities from '../icons/IconCommunities';

const ItemList = ({ url, auth, data, follow, itemType, topics }) => {
  const [itemsList, setItemsList] = useRemoteData(url, auth);
  const history = useHistory();

  const followItem = async (e) => {
    e.preventDefault();
    const { REACT_APP_URL } = process.env;

    const urlPOST = `${REACT_APP_URL}/${follow}/follow/${e.target.value}`;

    try {
      const res = await fetch(urlPOST, {
        method: 'POST',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();

      setItemsList(json);
    } catch (err) {
      console.error(err);
    }
  };

  if (itemType === 'community' && !itemsList[0]) {
    return (
      <div className="no-followed-topics">
        Primero tienes que seguir algunos temas para encontrar communidades
        <Link className="btn full" to={'/t'}>
          Temas
        </Link>
      </div>
    );
  } else {
    const { REACT_APP_URL_IMG } = process.env;
    return itemsList.map((item) => {
      const openCommunity = () => {
        history.push(`c/${item.name}`);
      };
      return (
        <div className="topic" key={item.id} onClick={itemType === 'community' ? openCommunity : null}>
          {itemType === 'topic' ? <IconTopic className={'medium logo ico'} /> : null}
          {itemType === 'community' ? (
            item.avatar === 'avatar-img' ? (
              <IconLogo className="ico logo s-m" />
            ) : (
              <img src={`${REACT_APP_URL_IMG}/${item.avatar}`} alt="avatar foto" className="avatar foto" />
            )
          ) : null}
          <div>
            <h2>{item.name}</h2>
            <p>{item.follows} seguidores</p>
          </div>
          {item.followed ? (
            <button value={item.id} className={'followed'} onClick={followItem}>
              Siguiendo
            </button>
          ) : (
            <button value={item.id} onClick={followItem}>
              Seguir
            </button>
          )}
        </div>
      );
    });
  }
};

export default ItemList;
