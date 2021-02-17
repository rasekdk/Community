import { useState } from 'react';
import CreatePostModal from '../Modals/CreatePostModal';
import Modal from '../Modals/Modal';

const Pruebas = () => {
  const [modalHolder, setModalHolder] = useState(true);
  return (
    <Modal setModalHolder={setModalHolder} modalHolder={modalHolder}>
      <CreatePostModal />
    </Modal>
  );
};

export default Pruebas;
