import SeatSelection from './components/SeatSelection'
import TicketHeader from './components/TicketSelectedHeader'
import ShowtimeHeader from './components/TicketSelectedHeader/header'
import styles from './showtime.module.scss'
import { useState } from 'react'
function Showtime() {
    const [selectedTime, setSelectedTime] = useState('04:10');
    
    return (

        <div className={styles.Wrapper}>
            <TicketHeader selectedTime ={selectedTime} setSelectedTime={setSelectedTime}/>
            <SeatSelection selectedTime ={selectedTime} setSelectedTime={setSelectedTime}/>

        </div>
    )
}

export default Showtime