import React, { useState } from 'react';
import sty from './TicketHeader.module.scss'; // SCSS module

import { useDispatch } from 'react-redux';
import { setSeat } from '~/redux/seatAD/seatSlice';

const TicketHeader = ({ showtimeData }) => {
    // State để quản lý thời gian được chọn và số lượng vé
    const [selectedTime, setSelectedTime] = useState(null);
    
    const dispatch = useDispatch()
    // Kiểm tra nếu không có dữ liệu showtimeData hoặc không có thời gian khả dụng
    if (!showtimeData || !showtimeData.times || showtimeData.times.length === 0) {
        return <div>Loading or no showtime available...</div>;
    }

    // Xử lý khi người dùng chọn một thời gian
    const handleTimeSelect = (time) => {
        if (time.available) {
            
            setSelectedTime(time.time);
            dispatch(setSeat(time));
        }
    };

    return (
        <div className={sty.ticketHeader}>
            <div className={sty.showTimes}>
                {showtimeData.times.map((time, index) => (
                    <button
                        key={index}
                        className={`${sty.showTimeButton} ${
                            time.available ? '' : sty.unavailable
                        } ${time.time === selectedTime ? sty.selected : ''}`}
                        onClick={() => handleTimeSelect(time)}
                        disabled={!time.available}
                    >
                        {time.time} PM
                        {time.label && <span className={sty.label}>{time.label}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TicketHeader;
