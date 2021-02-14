import useRemoteData from '../../hooks/useRemoteData';
import IconTopic from '../icons/IconTopic';
import IconLogo from '../icons/IconLogo';

import { Link } from 'react-router-dom';

const ItemList = ({ url, auth, data, follow, itemType, topics }) => {
  const [itemsList, setItemsList] = useRemoteData(url, auth);

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
    return itemsList.map((item) => (
      <div className="topic" key={item.id}>
        {itemType === 'topic' ? (
          <IconTopic className={'medium logo ico'} />
        ) : null}
        {itemType === 'community' ? (
          <IconLogo className={'medium logo ico'} />
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
    ));
  }
};

export default ItemList;