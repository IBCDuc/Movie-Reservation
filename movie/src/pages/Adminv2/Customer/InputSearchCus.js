import { Col, Row, Input, Form, theme, Button } from "antd";

const InputSearchCus = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const {handleQuerySearch} = props
  
  const formStyle = {
    maxWidth: "600px",
   // background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: "10px",
    marginBottom:'40px'
  };

  const onFinish = (value) => {
    const {name} = value
    let querySearch = ``;
    if(name){
      querySearch+=`&search=${name}`
    }
    handleQuerySearch(querySearch)
  };

  return (
    <>
      <Form name="advanced_search" style={formStyle} form={form} onFinish={onFinish} >
        <Row>
          <Col span={10}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`name`}
              label={"Search Name"}
              autocomplete="off"
            >
              <Input status="" />
            </Form.Item>
          </Col>
          <Col span={4} style={{ textAlign: "right", marginTop:"40px" }}>
            <Button type="primary" htmlType="submit">
                Search
            </Button>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Form>
    </>
  );
};

export default InputSearchCus;
