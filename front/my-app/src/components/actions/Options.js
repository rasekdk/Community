import IconFlag from '../icons/IconFlag';

import DeleteItem from './DeleteItem';
import EditItem from './EditItem';

const Options = ({ data, setData, optionsOpen, setOptionsOpen, url }) => {
  const hideOption = () => {
    setOptionsOpen(false);
  };

  return optionsOpen ? (
    <div>
      <div className="modal-full options" onClick={hideOption} />
      <ul className="more-options">
        <EditItem data={data} setData={setData} setOptionsOpen={setOptionsOpen} url={url} />
        <DeleteItem data={data} setData={setData} url={url} />
        <li className="option">
          <IconFlag className="ico small" />
          Reportar
        </li>
      </ul>
    </div>
  ) : null;
};

export default Options;
