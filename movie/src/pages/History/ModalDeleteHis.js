import { Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { callAllMovies, callCancelOrderUser, callDeleteReservation } from '../../services/api';

const ModalDeleteHis = (props) => {
  const { open, setOpen, id, fetchList } = props;

  // console.log('id>>>', id);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    // const res = await callCancelOrderUser(id)
    const res = await callDeleteReservation(id); // Test res only
    if (res && res?.success) {
      console.log('check res', res);
      message.success("Order successfully canceled");
      setOpen(false);
      await fetchList();
    } else {
      message.error("An error occurred while canceling the order");
    }
  };

  return (
    <>
      <Modal
        title="Confirm Cancel Order"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>
          Are you sure you want to cancel this order?
        </span>
      </Modal>
    </>
  );
};

export default ModalDeleteHis;
