import { Modal } from "react-bootstrap";
import CareerForm from "./CareerForm";

const CareerModal = ({ show, handleClose, serviceName }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop="static" 
      keyboard={false}
    >
      <Modal.Header closeButton>
        {/* Title intentionally empty to keep design same */}
      </Modal.Header>

      <Modal.Body>
        {/* PASS SERVICE NAME */}
        <CareerForm serviceName={serviceName} />
      </Modal.Body>
    </Modal>
  );
};

export default CareerModal;
