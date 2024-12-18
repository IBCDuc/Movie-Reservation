import {
  Modal,
  Form,
  Input,
  Col,
  Row,
  Divider,
  Upload,
  Select,
  message,
  notification,
  DatePicker, theme
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { callAddSeat } from "../../../services/api";
import { getCategory } from "../../../redux/categoryAD/categorySlice";
import imgUpload from '../../../assets/img-upload.jpg'
const ModalCreateTour = (props) => {
  const { open, setOpen, fetchGetRoomTour, setTypeRT} = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm()
  const { TextArea } = Input;
  

  const userRole = useSelector((state) => state.account.role);


 
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  // let options = cates?.map( (item) => {
  //     return {
  //       value: item.id,
  //       label: item.name
  //     }
  // })

  let options = [{
    value: 1,
    label: "Uncategories",
    
  }, {
    value: 2,
    label: "Fruit"
  }]


  const handleFileBanner = (e) => {

    const files = [...banner]; 
    files.push(...e.target.files); 
    setBanner({files});
    setBannerPreview({files});
  }

  const handleFileLogo = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
      setLogoPreview(URL.createObjectURL(event.target.files[0]))
    } 
  };
  //Cate status



  let optionsStatus = [
      {
          value: "1",
          label: "Public"
      },
      {
          value: "0",
          label: "UnPublic"
      }
  ]

  let optionsType = [
      {
          value: "room",
          label: "Room"
      },
      {
          value: "tour",
          label: "Tour"
      }
  ]


  const onFinish = async (value) => {
    const {name,cost, description, status} = value
          setIsSubmit(true)
          let res = {};
          if (userRole != "Admin") {
            res.message = "You dont have create permission!!!   ";
          } else {
            res = await callAddSeat(name, description, cost, logo, status)
          }
          console.log(res)
          setIsSubmit(false)
          if(res ){
              console.log("res check", res);
              message.success('Product create successfully')
              form.resetFields();
              setOpen(false)
              setTypeRT('&type_room[]=tour')
              await fetchGetRoomTour()

            } else {
                notification.error({
                message: 'Something gone wrong!!!',
                description: res.message || "Can't Create Product" ,
                duration: 3
            })

          }
          //console.log("res check", value);
    };


    const onChangeStart = (date, dateString) => {
      // console.log('start>>>', dateString);
       setStartDate(dateString)
     };
     const onChangeEnd = (date, dateString) => {
       //console.log('end>>>',date, dateString);
       setEndDate(dateString)
     };


  return (
    <>
      <Modal
        title="Add product"
        open={open}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setBanner([])
          setBannerPreview([])
          setLogo(null)
          setLogoPreview(null)
        }}
        okText="Create new"
        cancelText="Cancel"
        confirmLoading={isSubmit}
        width={'50vw'}
        maskClosable = {false}
      >
        <Divider/>
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Name Cinema"
                name="name"
                // labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input name!"}]}
              >
                <Input />
              </Form.Item>
            </Col>
            
            <Col span={8} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Logo"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input logo!" }]}
              >

                {/* <input type="file" onChange={(e)=>handleUploadImg(e, 'logo')}/> */}

                <div style={{marginTop:'15px'}}>
                  <label for="fileUpload" className="upload-files">
                      Upload Logo
                  </label>
               </div>
               <input
                id="fileUpload"
                type={"file"}
                onChange={handleFileLogo}
                style={{ visibility: "hidden" }}
              />
              <div className="list-img-review">
                    <div className="img-review-item">
                       <img src={logoPreview || imgUpload} alt="#imgLogo" style={{width: '100%', height: '100%'}} />
                    </div> 
              </div>

              </Form.Item>
            </Col>
            
            <Col span={24} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Description"
                name="description"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input description!" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
      
          </Row>
        </Form>
      </Modal>
      
    </>
  );
};

export default ModalCreateTour;
