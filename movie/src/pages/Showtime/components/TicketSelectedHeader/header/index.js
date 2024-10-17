import sty from './showtimeheader.module.scss'
import { useContext, useState, useLayoutEffect} from 'react';
import { showtimeApi } from '~/pages/Showtime/Api/api';
import { ThemeContext } from '~/ShowtimeSContext';
function ShowtimeHeader( {selectedTime, setSelectedTime} ) {

    
    const {showtimeSelection, setShowtimeSelection} = useContext(ThemeContext)
    
    const dateList = showtimeApi[0].showTimes.find((item) => {
        return item.date === showtimeSelection.date
    })
    
    const handletimeList = () => {
        setSelectedTime(dateList.times[0].time)
    }

    const timeList = dateList.times.find((item) => {
        
        return item.time === selectedTime 

    })
    
    return (
        <header className={sty.movieInfo}>
            <div className ={sty.leftback}>
            <a ><i class="fa-solid fa-arrow-left fa-xl"></i></a>
            </div>
            <h3>
                Jigra <span className={sty.rating}>UA</span>
            </h3>
            <p>INOX: Metro Mall Junction, Kalyan (E) | {dateList.date}, {timeList.time}</p>
        </header>
    );
}

export default ShowtimeHeader;