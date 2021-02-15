import { useState } from 'react';
import IconFlag from '../icons/IconFlag';

import DeleteItem from './DeleteItem';
import EditItem from './EditItem';

const Options = ({ data, setData, optionsOpen, setOptionsOpen }) => {
  const hideOption = () => {
    setOptionsOpen(false);
  };

  return optionsOpen ? (
    <div>
      <div className="modal-full options" onClick={hideOption} />
      <ul className="more-options">
        <EditItem data={data} setData={setData} setOptionsOpen={setOptionsOpen} />
        <DeleteItem data={data} setData={setData} />
        <li className="option">
          <IconFlag className="ico small" />
          Reportar
        </li>
      </ul>
    </div>
  ) : null;
};

export default Options;
