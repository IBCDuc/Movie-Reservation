import React, { useState, useEffect } from "react";
import './a.css'; // Đảm bảo đã import CSS
import { useSelector } from "react-redux";
import Loading from "~/components/Layout/components/Loading/loading";
import { message } from 'antd'; // Add this import
import StickyFooter from "../TicketSelectedHeader/footer";
import { callBookSeats } from "~/services/api";
import ModalBooking from "./modalBooking";


const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isBooking, setIsBooking] = useState(false);
  const showtimeData = useSelector((state) => state.showtime.showtime);
  const user = useSelector((state) => state.account.user);

  const [openModalBook, setOpenModalBook] = useState(false);

  // Lấy dữ liệu ghế từ Redux
  const seatData = useSelector((state) => state.seat.seat);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const SEAT_PRICES = {
    regular: 75000,
    vip: 120000,
    couple: 200000
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };
  // Nhóm ghế theo hàng
  const groupSeatsByRow = (seats) => {
    return seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});
  };

  // Xử lý toggle ghế
  const toggleSeat = (seatId, seatType = 'regular') => {
    const seatPrice = SEAT_PRICES[seatType];
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
      setPrice(prev => prev - seatPrice);
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
      setPrice(prev => prev + seatPrice);
    }
  };

  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);
  const bookingData = {
        userId: user?.user?.user_id,
        showtimeId: showtimeData?.id,
        seatIds: selectedSeats,
        totalPrice: price
    };
  // const handleBookSeats = async () => {
  //   if (selectedSeats.length === 0) {
  //     message.warning('Please select at least one seat');
  //     return;
  //   }

  //   try {
  //     setIsBooking(true);
  //     const bookingData = {
  //       userId: user.id,
  //       showtimeId: showtimeData.id,
  //       seatIds: selectedSeats,
  //       totalPrice: price
  //     };

  //     const response = await callBookSeats(bookingData);
      
  //     if (response.success) {
  //       message.success('Booking successful!');
  //       setSelectedSeats([]);
  //       setPrice(0);
  //     } else {
  //       message.error(response.message || 'Booking failed');
  //     }
  //   } catch (error) {
  //     console.error('Booking error:', error);
  //     message.error('An error occurred while booking');
  //   } finally {
  //     setIsBooking(false);
  //   }
  // };

  const handleBookSeats = async () => {
      setOpenModalBook(true);
  };


  if (loading) {
    return <Loading />;
  }

  const groupedSeats = seatData?.seats ? groupSeatsByRow(seatData.seats) : {};

  return (
    <>
    <div className="seat-selection-container">

      <div className="screen-container">
        <svg 
          viewBox="0 0 100 20"
          className="screen-svg"
        >
          <path
            d="M0,20 L10,2 C20,0 80,0 90,2 L100,20 Z"
            fill="white"
            className="screen-path"
          />
          <text x="50" y="12" textAnchor="middle" className="screen-text">
            SCREEN
          </text>
        </svg>
      </div>

      <div className="seat-layout">
        {Object.keys(groupedSeats).map((row) => (
          <div key={row} className="seat-row">
            <div className="row">
              <span className="row-name">{row}</span>
              <div className="seats">
                {groupedSeats[row].map((seat) => (
                  <button
                    key={seat.seatId}
                    className={`seat ${
                      seat.status === true
                        ? "booked"
                        : isSeatSelected(seat.seatId)
                        ? "selected"
                        : ""
                    }`}
                    disabled={seat.isBooked}
                    onClick={() => toggleSeat(seat.seatId, seat.price)}
                  >
                    {seat.seatNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <StickyFooter 
        selectedSeats={selectedSeats}
        totalPrice={price}
        formatPrice={formatPrice}
        onBookSeats={handleBookSeats}
        isBooking={isBooking}
      />
    </div>
    <ModalBooking
        open={openModalBook}
        setOpen={setOpenModalBook}
        bookingData={bookingData}
      />
    </>
  );
};

export default SeatSelection;
