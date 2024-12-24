import { Drawer, Descriptions, Badge } from 'antd';
import moment from 'moment';
const ViewDetailOrder = (props) => {
    const { open, setOpen, dataView } = props;

    return (
        <Drawer
            title="Xem chi tiết"
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
            size="large"
        >
            <Descriptions bordered column={2}>
                {/* Order Information */}
                <Descriptions.Item label="Reservation ID">
                    {dataView?.Reservation_id || 'No reservation ID'}
                </Descriptions.Item>
                <Descriptions.Item label="Reservation Date">
                    {dataView?.seatSlot?.showtimeHours?.showtimeDate?.Movie_date 
                        ? moment(dataView?.seatSlot?.showtimeHours?.showtimeDate?.Movie_date).format('DD/MM/YYYY')
                        : 'No date available'
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Show Time">
                    {dataView?.seatSlot?.showtimeHours?.Movie_hour || 'No time available'}
                </Descriptions.Item>
                <Descriptions.Item label="Total Price">
                    {dataView?.total_price !== undefined
                        ? `${dataView.total_price.toLocaleString()} VNĐ`
                        : 'No total price available'}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                    <Badge
                        status={dataView?.status === 'success' ? 'success' : 'error'}
                        text={dataView?.status || 'No status'}
                    />
                </Descriptions.Item>

                {/* Seat Information */}
                <Descriptions.Item label="Seats" span={2}>
                    {dataView?.seatSlot ? (
                        <div>
                            <p>
                                {dataView.seatSlot.row}
                                {dataView.seatSlot.seat_number} ({dataView.seatSlot.type})
                            </p>
                        </div>
                    ) : (
                        <p>No seat information available</p>
                    )}
                </Descriptions.Item>

                {/* Customer Information */}
                <Descriptions.Item label="Customer Name">
                    {dataView?.user?.user_name || 'No customer name'}
                </Descriptions.Item>
                <Descriptions.Item label="Customer Phone">
                    {dataView?.user?.phone || 'No phone number available'}
                </Descriptions.Item>
                <Descriptions.Item label="Customer Email">
                    {dataView?.user?.email || 'No email available'}
                </Descriptions.Item>

                {/* Movie Information */}
                <Descriptions.Item label="Movie Name">
                    {dataView?.seatSlot?.showtimeHours?.showtimeDate?.movie?.Movie_name || 'No movie name available'}
                </Descriptions.Item>
                <Descriptions.Item label="Movie Poster" span={2}>
                    {dataView?.seatSlot?.showtimeHours?.showtimeDate?.movie?.img_url ? (
                        <img
                            src={dataView.seatSlot.showtimeHours.showtimeDate.movie.img_url}
                            alt="Movie Poster"
                            style={{ height: '300px', width: '200px' }}
                        />
                    ) : (
                        'No image available'
                    )}
                </Descriptions.Item>

                {/* Additional Information */}
                <Descriptions.Item label="Logo" span={2}>
                    {dataView?.logo ? (
                        <img
                            src={dataView.logo}
                            alt="Logo"
                            style={{ height: '100px', width: '100px' }}
                        />
                    ) : (
                        'No logo available'
                    )}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
};

export default ViewDetailOrder;