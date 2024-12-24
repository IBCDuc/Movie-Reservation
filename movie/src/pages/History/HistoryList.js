import "./layoutHis.scss";
//  
import {
  Divider,
  Badge,
  Input,
  message,
  Dropdown,
  Select,
  Avatar,
  Button,
  Tag,
  Pagination,
} from "antd";
import { callAllMovies, callGetListOrderUser, callGetUserReservation } from "../../services/api";
import { useState, useEffect } from "react";
import ModalDeleteHis from "./ModalDeleteHis";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
const HistoriesList = () => {
  const { Search } = Input;
  const user = useSelector((state) => state.account.user);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(5);

  const [listOrder, setListOrder] = useState([]);
  const [typeRoom, setTypeRoom] = useState("&type[]=tour");
  const [statusOrder, setStatusOrder] = useState("&status[]=pending");
  const [searchQuery, setSearchQuery] = useState("");

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idOrder, setIdOrder] = useState(null);

  const navigate = useNavigate();

  const handleCancelOrder = (idOrder) => {
    setIdOrder(idOrder);
    setOpenModalDelete(true);
  };

  // Search
  const onSearch = (value) => {
    setSearchQuery(`&search=${value}`);
    setCurrentPage(1);
  };

  // Select
  const handleChangeType = (value) => {
    if (value !== typeRoom) {
      setTypeRoom(value);
      setCurrentPage(1);
    }
  };

  const handleChangeStatus = (value) => {
    if (value !== statusOrder) {
      setStatusOrder(value);
      setCurrentPage(1);
    }
  };

  // Pagination
  const handleOnChangePage = (curr, size) => {
    if (curr !== currentPage) {
      setCurrentPage(curr);
    }
    if (size !== pageSize) {
      setPageSize(size);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchListOrderCus();
  }, [currentPage, pageSize, typeRoom, statusOrder, searchQuery]);

  const fetchListOrderCus = async () => {
    let queryOrder = `page=${currentPage}&perpage=${pageSize}`;

    if (searchQuery) {
      queryOrder += searchQuery;
    }

    if (typeRoom) {
      queryOrder += typeRoom;
    }

    if (statusOrder) {
      queryOrder += statusOrder;
    }

    const res = await callGetUserReservation(user?.user?.user_id);
    if (res && res?.data) {
      setListOrder(res.data);
      setTotal(res.total);
    }
  };

  return (
    <>
      <div className="history-container">
        <div className="history-option">
          <span className="title-history">Movie Booking History</span>
          <div className="option-filter">
            <div className="input-search">
              <Search
                placeholder="Search by order name"
                onSearch={onSearch}
                style={{ width: 386 }}
              />
            </div>
            <div className="filter-right">
              <div className="filter-status-order">
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Filter
                </span>
                <div className="input-select">
                  <Select
                    style={{
                      width: 120,
                    }}
                    onChange={handleChangeType}
                    options={[
                      {
                        value: "&type[]=",
                        label: "",
                      },
                      {
                        value: "&type[]=room",
                        label: "Room",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="filter-status-order">
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  Filter by status
                </span>
                <div className="input-select">
                  <Select
                    defaultValue="Pending Payment"
                    style={{
                      width: 180,
                    }}
                    onChange={handleChangeStatus}
                    options={[
                      {
                        value: "&status[]=pending",
                        label: "Pending Payment",
                      },
                      {
                        value: "&status[]=access",
                        label: "Paid",
                      },
                      {
                        value: "&status[]=ending",
                        label: "Completed",
                      },

                      {
                        value: "&status[]=cancel",
                        label: "Canceled",
                      },
                      {
                        value: "&status[]=pending_cancel",
                        label: "Pending Cancellation",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-order">
          {listOrder?.length > 0 &&
            listOrder?.map((item) => {
              return (
                <>
                  <div className="order-item">
                    <div className="header-item">
                      <div className="info-code">
                        <span className="code-order">{`Order Code: DH200${item?.id}`}</span>
                        <span className="info-tag">
                          {item?.status === "pending" ? (
                            <Tag color="gold" style={{ fontSize: "13px" }}>
                              Pending Payment
                            </Tag>
                          ) : item?.status === "complete" ? (
                            <Tag color="green" style={{ fontSize: "13px" }}>
                              Completed
                            </Tag>
                          ) : item?.status === "ending" ? (
                            <Tag color="blue" style={{ fontSize: "13px" }}>
                              Ending
                            </Tag>
                          ) : item?.status === "pending_cancel" ? (
                            <Tag color="purple" style={{ fontSize: "13px" }}>
                              Pending Cancellation
                            </Tag>
                          ) : (
                            <Tag color="red" style={{ fontSize: "13px" }}>
                              Order Canceled
                            </Tag>
                          )}
                        </span>
                      </div>
                      <div className="btn-handle">
                        {statusOrder === '&status[]=pending' || statusOrder === '&status[]=access' ? (
                          <Button
                            danger
                            onClick={() => handleCancelOrder(item?.id)}
                          >
                            Cancel Order
                          </Button>
                        ) : (
                          ""
                        )}
                        <Button
                          type="primary"
                          onClick={() =>
                            navigate(`/personal/history/${item?.id}`)
                          }
                        >
                          View Order Details
                        </Button>
                      </div>
                    </div>
                    <Divider />
                    <div className="content-item">
                      <div className="media-content">
                        <img src={item?.logo} alt="#ImgOrder" />
                      </div>
                      <div className="tour-content">
                        <span className="title">{item?.name}</span>
                        <span className="date-start">Theater: {item?.cinemaName}</span>
                        <span className="date-start">Seat: {item?.seat}</span>
                        <span className="date-start">Date: {moment(item?.date).format('YYYY-MM-DD')}</span>
                        <span className="date-start"> Hour: {item?.hour}</span>
                        <span className="tour-price">
                          {`Total: `}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item?.cost ?? 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={(curr, size) => handleOnChangePage(curr, size)}
            total={total}
          />
        </div>
      </div>
      <ModalDeleteHis
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        id={idOrder}
        fetchList={fetchListOrderCus}
      />
    </>
  );
};

export default HistoriesList;
