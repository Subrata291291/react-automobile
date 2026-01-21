import { Modal, Button } from "react-bootstrap";
import QuoteForm from "./Form";

const QuoteModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Request A Quote</Modal.Title> */}
      </Modal.Header>

      <Modal.Body>
        <QuoteForm />
      </Modal.Body>
    </Modal>
  );
};

export default QuoteModal;
