import { Children, useState } from 'react';

const Modal = ({ modal, hideModal, children }) => {
  return (
    <div>
      <div className={modal ? 'modal-full open' : 'modal-full close'} onClick={hideModal} />
      {children}
    </div>
  );
};

export default Modal;
