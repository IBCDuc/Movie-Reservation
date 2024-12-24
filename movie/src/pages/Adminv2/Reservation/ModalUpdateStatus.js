import {
    Modal,
    Form,
    Input,
    Col,
    Row,
    Divider,
    Select,
    message,
    notification
  } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { callAddCinema, callUpdateStatusOrder } from "~/services/api";
// import { callAddProducts, callUpdateStatusOrder } from "../../../services/api";


  const ModalUpdateStatus = (props) => {
    const { open, setOpen, fetchGetOrderRoomTour, idOrder, dataView} = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [statusValue, setStatusValues] = useState("");
  
    const [form] = Form.useForm();
    const { TextArea } = Input;
 

    const optionsStatus = [
        {
            value: "complete",
            label: "Complete"
        },
        {
            value: "cancel",
            label: "Cancel"
        },
    ]

    const handleChangeStatus = (value) => {
        setStatusValues(value)
    }

    const onFinish = async () => {
      
     //  setIsSubmit(true)
       const res = await callUpdateStatusOrder(idOrder, statusValue)
      // setIsSubmit(false)
       if (res){
        //   if (statusValue == "Completed") {
        //     const res_product = await callAddCinema();
        //   }
          message.success('Update status successfully!!!')
          form.resetFields();
          setOpen(false)
          await fetchGetOrderRoomTour()
        }else{
            notification.error({
            message: 'Something gone wrong !!!!',
            description:"Can't update status",
            duration: 3
        })

       // console.log("res check", res);
       }
  
    };
  
    return (
      <>
        <Modal
          title="Update Status Order"
          open={open}
          onOk={() => form.submit()}
          onCancel={() => {
            setOpen(false);
            form.resetFields()
          }}
          okText="Update"
          cancelText="Cancel"
          confirmLoading={isSubmit}
          width={'25vw'}
          maskClosable = {false}
        >
          <Divider/>
          <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
            <Row gutter={15}>
              <Col span={12} style={{ padding: "0 10px" }}>
                <Form.Item
                  label="Select Status Order"
                  name="name"
                  labelCol={{ span: 24 }}
                >
                   <Select
                    showSearch
                    placeholder="Select a status"
                    optionFilterProp="children"
                    options={optionsStatus}
                    onChange={handleChangeStatus}
                 />
                </Form.Item>
              </Col>
        
            </Row>
          </Form>
        </Modal>
        
      </>
    );
  };
  
  export default ModalUpdateStatus;
  