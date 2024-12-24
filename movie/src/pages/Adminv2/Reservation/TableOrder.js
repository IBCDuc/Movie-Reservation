import { Table, Badge, Select, Button, Popconfirm, message, Form, Drawer } from "antd";
import { RedoOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callGetAllReservation } from "../../../services/api";
import InputSearchOrder from "./InputSearchOrder";
import ViewDetailOrder from "./ViewDetailOrder";
import ModalUpdateStatus from "./ModalUpdateStatus.js";

const TableOrder = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [listOrder, setListOrder] = useState([]);

    const [openViewModal, setOpenViewModal] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState({});

    const [openModalUpdateStatus, setOpenModalUpdateStatus] = useState(false);
    const [idOrder, setIdOrder] = useState(0);

    const columns = [
        {
            title: "Reservation ID",
            dataIndex: "Reservation_id",
            render: (text, record) => (
                <a
                    onClick={() => {
                        setOpenViewModal(true);
                        setDataViewDetail(record);
                    }}
                >
                    ORD0{record.Reservation_id}
                </a>
            ),
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (user) => `${user.user_name}`,
        },
         
         
        {
            title: "Movie Name",
            dataIndex: ["seatSlot", "showtimeHours", "showtimeDate", "movie", "Movie_name"],
        },
        {
            title: "Cinema Room",
            dataIndex: ["seatSlot", "cinemaRoom", "name"],
        },
        {
            title: "Seat Info",
            render: (_, record) => {
                const { seatSlot } = record;
                return `${seatSlot.row}${seatSlot.seat_number} (${seatSlot.type})`;
            },
        },
        {
            title: "Showtime",
            render: (_, record) => {
                const { showtimeHours } = record.seatSlot;
                const movieDate = new Date(showtimeHours.showtimeDate.Movie_date).toLocaleDateString();
                const movieHour = showtimeHours.Movie_hour;
                return `${movieDate} - ${movieHour}`;
            },
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            render: (text) => `${text} VNĐ`,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                return status === null ? "Order Cancelled" : status;
            }
        },
        {
            title: "Action",
            render: (_, record) => (
                <>
                    <EditTwoTone
                        twoToneColor="#3cc41a"
                        style={{ cursor: "pointer", marginLeft: "20px" }}
                        onClick={() => {
                            setOpenModalUpdateStatus(true);
                            setIdOrder(record.Reservation_id);
                        }}
                    />
                </>
            ),
        },
    ];

    useEffect(() => {
        fetchReservations();
    }, [currentPage, pageSize]);

    const fetchReservations = async () => {
        setIsLoading(true);
        const res = await callGetAllReservation();
        if (res && res?.data) {
            setListOrder(res.data);
            setTotal(res.total);
        }
        setIsLoading(false);
    };

    const onChange = (pagination) => {
        if (pagination.current !== currentPage) {
            setCurrentPage(pagination.current);
        }
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
        }
    };

    return (
        <>
            <div className="container-table-cate">
                <div className="header-table">
                    <InputSearchOrder handleQuerySearch={(query) => console.log(query)} />
                </div>
                <Table
                    rowKey={(record) => record.Reservation_id}
                    columns={columns}
                    dataSource={listOrder}
                    onChange={onChange}
                    loading={isLoading}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "15", "20"],
                    }}
                />
            </div>

            <ViewDetailOrder
                open={openViewModal}
                setOpen={setOpenViewModal}
                dataView={dataViewDetail}
            />

            <ModalUpdateStatus
                open={openModalUpdateStatus}
                setOpen={setOpenModalUpdateStatus}
                fetchGetOrderRoomTour={fetchReservations}
                idOrder={idOrder}
            />
        </>
    );
};

export default TableOrder;
