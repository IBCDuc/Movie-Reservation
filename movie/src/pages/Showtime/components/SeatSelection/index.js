import React, { useState, useEffect, useContext } from "react";
import './a.css'
import { showtimeApi } from "../../Api/api";
import StickyFooter from "../TicketSelectedHeader/footer";
import { ThemeContext } from "~/ShowtimeSContext";


const SeatSelection = ({ selectedTime, setSelectedTime }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtimeData, setShowtimeData] = useState(null);
  const {showtimeSelection, setShowtimeSelection} = useContext(ThemeContext)
  const [price, setPrice] = useState(0)
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  // Tìm dữ liệu chiếu phim dựa trên movieId và ngày chiếu
  /* useEffect(() => {
    const movie = showtimeApi.find((m) => m.movieId === movieId);
    if (movie) {
      const showTime = movie.showTimes.find((time) => time.date === showDate);
      setShowtimeData(showTime);
    }
  }, [movieId, showDate]); */

  // Toggle chọn hoặc bỏ chọn ghế
  const toggleSeat = (seatNumber, seatPrice) => {
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      setPrice(prev => prev - seatPrice )
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
      setPrice(prev => prev + seatPrice )
    }
  };

  const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber);
  
  const timesList = showtimeSelection.times.find((item) => {

    return (item.time === selectedTime)
  })

  
  return (
    <div className="seat-selection-container">
      
      <h2>Select Seats</h2>
      <div className="seat-grid">
        {showtimeApi ? (
          timesList?.seats?.map((seat) => (
            <button
              key={seat.seatNumber}
              className={`seat ${seat.isBooked ? "booked" : isSeatSelected(seat.seatNumber) ? "selected" : ""}`}
              disabled={seat.isBooked}
              onClick={() => toggleSeat(seat.seatNumber, seat.price)}
            >
              <i class="fa-solid fa-chair" style={{color: "#393a3c", display: "block"}}/>
              {seat.seatNumber}
              
            </button>
          ))
        ) : (
          <p>No seats available for this showtime.</p>
        )}
      </div>
      <div className="screen">Just a movie</div>
      <div className='pay'><h3>Pay: {price}$</h3></div>
      <div className="actions">
        <button onClick={() => console.log(selectedSeats)}>Buy</button>
        <button onClick={() => console.log("Reservar")}>Cancel</button>
      </div>
      <StickyFooter/>
    </div>
  );
};

export default SeatSelection;
