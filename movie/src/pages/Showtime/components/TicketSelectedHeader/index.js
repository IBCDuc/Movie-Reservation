import React, { useState } from 'react';
import sty from './TicketHeader.module.scss'; // SCSS module

const TicketHeader = () => {
  const [selectedTime, setSelectedTime] = useState('04:10');
  const [ticketCount, setTicketCount] = useState(3);

  const times = [
    { time: '04:10 PM', available: true, highlight: true },
    { time: '06:40 PM', available: false, label: 'KOTAK INSIGNIA' },
    { time: '07:30 PM', available: true },
    { time: '10:50 PM', available: true },
  ];

  const handleTimeSelect = (time) => {
    if (time.available) setSelectedTime(time.time);
  };
  

  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };

  return (
    <div className={sty.ticketHeader}>
      
      <div className={sty.showTimes}>
        {times.map((time, index) => (
          <button
            key={index}
            className={`${sty.showTimeButton} ${time.available ? '' : sty.unavailable} ${time.time === selectedTime ? sty.selected : ''}`}
            onClick={() => handleTimeSelect(time)}
            disabled={!time.available}
          >
            {time.time}
            {time.label && <span className={sty.label}>{time.label}</span>}
          </button>
        ))}
      </div>
      <div className={sty.ticketCount}>
        
      </div>
    </div>
  );
};

export default TicketHeader;
