import Modal from "react-modal";
import { useSelector } from "react-redux";

const ModalContainer = () => {
  const { Component, isOpen, content, onConfirm } = useSelector(
    (state) => state.modalReducer
  );
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      width: "300px",
      height: "150px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  };
  return (
    <>
      <Modal isOpen={isOpen} ariaHideApp={false} style={modalStyle}>
        {Component && <Component content={content} onConfirm={onConfirm} />}
      </Modal>
    </>
  );
};

export default ModalContainer;
