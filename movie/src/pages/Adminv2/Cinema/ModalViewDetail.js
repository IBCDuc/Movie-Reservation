import {Badge, Select, Drawer, Descriptions, Row, Col, Button } from "antd";
import ViewSeatsModal from './ModalViewSeat'
import { useState } from 'react';
const ModalViewDetail = (props) => {
    const {open, setOpen, dataView, seatData} = props
    const [isModalOpen, setModalOpen] = useState(false);
    
    const onClose = () => {
        setOpen(false)
    }
    const handleViewSeats = () => {
        setModalOpen(true); // Mở modal
      };
    
    return ( 
        <>
            <Drawer 
                title="Xem chi tiết" 
                placement="right" 
                onClose={onClose} 
                open={open}
                size={"large"}
            >
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="ID">
                        {dataView?.cinemaId}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="RoomID">
                        {dataView?.room_id}
                    </Descriptions.Item> */}
                    
                    <Descriptions.Item label="Cinema Name">
                        {dataView?.cinemaName}
                    </Descriptions.Item>
                    <Descriptions.Item label="View Seat">
                    <Button
                        type="link"
                        onClick={handleViewSeats}
                        style={{ textAlign: 'left', padding: 0 }} // Căn chữ trái và loại bỏ khoảng padding mặc định
                        >
                        {dataView?.type_room || "View Seats"}
                    </Button>

                    </Descriptions.Item>
                    <Descriptions.Item label="Create At">
                        {dataView?.created_at}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={12}>
                        <Badge status="processing" /> {' '}
                        {dataView?.cinemaStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={12}>
                        {dataView?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Logo" span={12}>
                        {dataView?.logo ? <>
                            <img src={`${dataView?.logo}`} alt="#imgLogo" style={{height:"250px", width:"350px"}}/>
                        </>
                        :   "Không có ảnh hiển thị"

                        }
                    </Descriptions.Item>
                   
                    
                   
                </Descriptions>
            </Drawer>
            <ViewSeatsModal
                open={isModalOpen}
                setOpen={setModalOpen}
                seatData={seatData}
            />
        </>
     );
}
 
export default ModalViewDetail;