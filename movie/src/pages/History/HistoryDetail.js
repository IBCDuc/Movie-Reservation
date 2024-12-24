import { useState } from "react";
// import img4 from "../../assets/img4.jpg";
import "./hisDetail.scss";
import { Divider, message, Button, Steps } from "antd";
import moment from "moment";
import ModalCancelOrder from "./ModalCancelOrder";
import ModalPayment from "./ModalPayment";

const HistoryDetail = (props) => {
  const { dataDetail } = props;
  
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);

  return (
    <>
      <div className="history-container">
        <div className="history-option">
          <div className="step-order">
            <Steps
              current={1}
              items={[
                {
                  title: "Order Placed",
                  // description: "Description 1",
                },
                {
                  title: "Awaiting Payment",
                  // description: "Description 2",
                },
                {
                  title: "Payment Successful",
                  // description: "Description 3",
                },
                {
                  title: "Review",
                  // description: "Description 4",
                },
              ]}
            />
          </div>
          <span className="title-history-detail">{`Order ID: DH200${dataDetail?.id}`}</span>
        </div>
        <div className="detail-order">
          <div className="content-left">
            <div className="media">
              <img src={dataDetail?.logo} alt="#ImgOrder" />
            </div>
            <div className="content-detail">
              <span className="title-detail">{dataDetail?.movie?.Movie_name}</span>
              <div className="info-tour-two">

              <div className="info-detail-item">
                  <span className="info-title">Movie:</span>
                  <span>{dataDetail?.name}</span>
                </div>

                <div className="info-detail-item">
                  <span className="info-title">Cinema:</span>
                  <span>{dataDetail?.cinemaName}</span>
                </div>

                <div className="info-detail-item">
                  <span className="info-title">Show Date:</span>
                  <span>{moment(dataDetail?.showtimeDate_Movie_date).format('YYYY-MM-DD')}</span>
                </div>
                <div className="info-detail-item">
                  <span className="info-title">Show Time:</span>
                  <span>{dataDetail?.showtimeHours_Movie_hour}</span>
                </div>
                <div className="info-detail-item">
                  <span className="info-title">Seats:</span>
                  <span>{dataDetail?.seat}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <span className="title-content-right">Payer Information</span>
            <div className="item-content-right">
              <div className="main-content-right">
                <span className="item-one">Full Name:</span>
                <span className="item-two">
                  {dataDetail?.user?.display_name}
                </span>
              </div>
              <div className="main-content-right">
                <span className="item-one">Phone Number:</span>
                <span className="item-two">
                  {dataDetail?.user?.phone_number}
                </span>
              </div>
              <div className="main-content-right">
                <span className="item-one">Email:</span>
                <span className="item-two">{dataDetail?.user?.email}</span>
              </div>
            </div>
            <div className="group-btn-right">
              <Button type="primary" onClick={() => setOpenModalPayment(true)}>
                Pay
              </Button>
              <Button type="primary" danger onClick={() => setOpenModalCancel(true)}>
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
        <div className="total-price">
          <span>Total</span>
          <span className="price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(dataDetail?.cost ?? 0)}
          </span>
        </div>
      </div>
      <ModalCancelOrder
        open={openModalCancel}
        setOpen={setOpenModalCancel}
        id={dataDetail?.id}
      />
      <ModalPayment
        open={openModalPayment}
        setOpen={setOpenModalPayment}
      />
    </>
  );
};

export default HistoryDetail;
