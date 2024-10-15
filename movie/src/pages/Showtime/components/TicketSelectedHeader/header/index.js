import sty from './showtimeheader.module.scss'
import { useState } from 'react';
function ShowtimeHeader() {
    const [selectedTime, setSelectedTime] = useState('04:10 PM');
  
    const times = [
        { time: '04:10 PM', available: true, highlight: true },
        { time: '06:40 PM', available: false, label: 'KOTAK INSIGNIA' },
        { time: '07:30 PM', available: true },
        { time: '10:50 PM', available: true },
      ];
    
      const handleTimeSelect = (time) => {
        if (time.available) setSelectedTime(time.time);
      };
    
     
    return (
        <header className={sty.movieInfo}>
            <div className ={sty.leftback}>
            <a href='/'><i class="fa-solid fa-arrow-left fa-xl"></i></a>
            </div>
            <h3>
                Jigra <span className={sty.rating}>UA</span>
            </h3>
            <p>INOX: Metro Mall Junction, Kalyan (E) | Today, 12 Oct, {selectedTime}</p>
        </header>
    );
}

export default ShowtimeHeader;