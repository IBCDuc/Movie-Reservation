import React from 'react';
import { Modal, Row, Col, Typography, Divider } from 'antd';
import { FaChair } from 'react-icons/fa'; // Ghế từ react-icons
const { Title, Text } = Typography;
const ViewSeatsModal = ({ open, setOpen, seatData }) => {
  // seatData: array of rows, each row is an array of seat info
  // Example: [{ row: 'A', seats: [{ seatNumber: 1, status: 'available' }, ...] }, ...]

  const renderSeats = (rows) => {
    
    return rows.map((rowData, rowIndex) => (
      <div key={`row-${rowIndex}`} style={{ marginBottom: '16px' }}>
        <Title level={5}>{`Hàng: ${rowData.row}`}</Title>
        <Row gutter={[8, 8]}>
          {rowData.seats.map((seat) => (
            <Col key={seat.seatNumber} span={2}>
              <div
                style={{
                  textAlign: 'center',
                  padding: '12px 16px',
                  border: '2px solid #ccc',
                  borderRadius: '10px 10px 20px 20px', // Tạo hình dáng của ghế
                  backgroundColor:
                    seat.status === 'available' ? '#d9f7be' : '#ffccc7', // Màu nền cho ghế có trạng thái
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  width: '80px', // Điều chỉnh kích thước ghế
                  height: '60px', // Điều chỉnh chiều cao của ghế
                  margin: '0 auto', // Canh giữa
                  transform: 'scale(1)', // Tạo hiệu ứng hover
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Phóng to khi hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Trở lại bình thường khi rời khỏi
                }}
              >
                <Text strong>
                    {seat.type === 'VIP' ? `1 (V)` : `1 (N)`} {/* Kiểm tra nếu type là 'vip' */}
                </Text>
              </div>
          </Col>
          ))}
        </Row>
      </div>
    ));
  };

  return (
    <Modal
      title="Chi Tiết Ghế"
      visible={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width="80vw"
    >
      <Title level={4}>Danh sách ghế</Title>
      <Divider />
      {seatData && seatData.length > 0 ? (
        renderSeats(seatData)
      ) : (
        <Text>Không có dữ liệu ghế.</Text>
      )}
    </Modal>
  );
};

export default ViewSeatsModal;
