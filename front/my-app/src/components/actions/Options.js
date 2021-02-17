import IconFlag from '../icons/IconFlag';

import DeleteItem from './DeleteItem';

const Options = ({ children, data, setData, optionsOpen, setOptionsOpen, url }) => {
  const hideOption = () => {
    setOptionsOpen(false);
  };

  return optionsOpen ? (
    <div style={{ height: 0, zIndex: 999 }}>
      <div className="modal-full options" onClick={hideOption} />
      <ul className="more-options">
        {children}
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
