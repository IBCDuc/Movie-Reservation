import { Col, Row, Input, Form, theme, Button } from "antd";

const InputSearchMovie = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { handleQuerySearch } = props;

  const formStyle = {
    maxWidth: "600px",
    borderRadius: token.borderRadiusLG,
    padding: "20px",
    marginBottom: '40px'
  };

  const onFinish = (value) => {
    const { name } = value;
    let querySearch = ``;
    if (name) {
      querySearch += `&search=${name}`;
    }
    handleQuerySearch(querySearch);
  };

  return (
<Form 
  name="advanced_search" 
  style={formStyle} 
  form={form} 
  onFinish={onFinish}
>
  <Row gutter={8} align="bottom">
    <Col span={18}>
      <Form.Item
        name="name"
        label="Search Name"
        labelCol={{ span: 24 }}
        style={{ marginBottom: 0 }}
      >
        <Input 
          placeholder="Enter search term" 
          style={{ height: '32px' }}
        />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item 
        style={{ marginBottom: 0 }}
      >
        <Button 
          type="primary" 
          htmlType="submit"
          style={{ width: '100%', height: '32px' }}
        >
          Search
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form>
  );
};

export default InputSearchMovie;