import { Modal, message } from 'antd';
// import QRImage from '../../assets/QRPayment.jpg'
import QRImage from '../../assets/qr codehihi.png';
import './modalPayment.scss';

const ModalPayment = (props) => {
  const { open, setOpen } = props;
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        // title="Confirm Cancel Order"
        open={open}
        onCancel={handleCancel}
        width={"25%"}
        footer={false}
      >
        <div className="payment-container">
          <div className="payment-title">PAYMENT</div>
          <div className="media-payment">
            {<img src={QRImage} alt="#imgQR" />}
          </div>
          <div className="info-payment">
            <div className="info-item">
              <div className="info-title">Account Name</div>
              <div className="info-content">Information Portal</div>
            </div>
            <div className="info-item">
              <div className="info-title">Account Number</div>
              <div className="info-content">0792292376</div>
            </div>
            <div className="info-item">
              <div className="info-title">Bank</div>
              <div className="info-content">Vietcombank - Ba Dinh Branch, Hanoi</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalPayment;
