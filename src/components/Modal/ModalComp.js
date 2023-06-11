import Modal from "react-modal";
import "./ModalComp.css";

const ModalComp = (props) => {
  return (
    <Modal
      isOpen={props.showModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={props.modalCloseHandler}
      className="modalStyle"
    >
      {props.children}
    </Modal>
  );
};

export default ModalComp;
