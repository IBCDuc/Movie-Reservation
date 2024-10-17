import React from 'react';
import sty from './TicketSchedule.module.scss'; // Import CSS cho styling
import { showtimeApi } from '~/pages/Showtime/Api/api';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '~/ShowtimeSContext';
const TicketSchedule = () => {

  //wait for restructure!!!
    /* const schedules = [
    {
      date: "June 25, 2022",
      times: ["09h30", "12h10", "15h30", "17h20", "21h00"],
    },
    {
      date: "June 26, 2022",
      times: ["11h30", "17h50", "20h30"],
    },
    {
      date: "July 23, 2022",
      times: ["08h00", "12h30", "14h30", "17h50", "22h10"],
    },
  ]; */
    const {showtimeSelection, setShowtimeSelection} = useContext(ThemeContext)
    
    const handleBuyButton = (schedule) => {
      
      return setShowtimeSelection(schedule)
    }
    
    const schedulesTest = showtimeApi[0].showTimes;
    
    
    
    return (
        <div className={sty.ticketSchedule}>
            {schedulesTest.map((schedule, index) => (
                <div key={index} className={sty.scheduleItem}>
                    <h3>{schedule.date}</h3>
                    <div className={sty.times}>
                        {schedule.times.map((time, i) => (
                            <li key={i} className={sty.timeButton}>
                                {time.time}
                            </li>
                        ))}
                    </div>
                    <Link to="/show-time">
                        <button className={sty.buyButton} onClick={() => handleBuyButton(schedule)}>
                            BUY TICKET
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default TicketSchedule;
