import { Modal, message } from 'antd';
import { callAllMovies, callCancelOrderUser } from '../../services/api';

const ModalCancelOrder = (props) => {
  
    const {open , setOpen, id} = props
   
   // console.log('id>>>',id);

    const handleCancel = () => {
      setOpen(false);
    };

    const handleOk = async() => {
    //   const res = await callCancelOrderUser(id)
    const res = await callAllMovies(id) // res test thôi
      if(res && res?.status === 200){
        console.log('check res',res);
        message.success("Đã hủy đơn hàng thành công")
        setOpen(false);
      }else{
        message.error("Đã có lỗi xảy ra khi hủy đơn hàng")
      }
      
    };


    return ( 
        <>
            <Modal 
                title="Xác Nhận Hủy Đơn Hàng" 
                open={open} 
                onOk={handleOk}
                onCancel={handleCancel}
                
              >
                <span>
                  Bạn có chắc chắn muốn hủy đơn hàng này?
                </span>
            </Modal>
        </>
     );
}
 
export default ModalCancelOrder;