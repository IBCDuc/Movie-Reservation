import React, { useState } from 'react';
import Seat from '../Seat';

const SeatGrid = ({ seats, revenue, setRevenue }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const onSelect = (rowIndex,revenue) => {
    // Kiểm tra nếu ghế đã được chọn thì hủy chọn, ngược lại thì chọn
    if (selectedSeats.includes(rowIndex)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== rowIndex));
      setRevenue(prev => prev - revenue)
    } else {
      setRevenue(prev => prev + revenue )
      setSelectedSeats([...selectedSeats, rowIndex]);
    }
  };  

    return (
        <div className="seatGrid">
            {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seatRow">
                    <button
                        className="seat"
                        onClick={() => onSelect(rowIndex, row.price)}
                        disabled={row.isBooked === true}
                        style={selectedSeats.includes(rowIndex) ? {backgroundColor: "green"} : {}}
                    >
                        {row.seatNumber}
                    </button>
                    
                </div>
                
            ))}
            
        </div>
    );
};

export default SeatGrid;
