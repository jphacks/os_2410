import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

function Modaltest() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const subtitle = "test";

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function goToNextModal() {
    closeModal();
    setModal2IsOpen(true);
  }

  return (
    <div>
      <button onClick={openModal}> Open Modal </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle}>Hello</h2>
        <p>This is a modal dialog</p>
        <button onClick={goToNextModal}>Go to next modal</button>
      </Modal>
      {/* モーダル2の表示部分は同様の構造で作成 */}
    </div>
  );
}

export default Modaltest;
