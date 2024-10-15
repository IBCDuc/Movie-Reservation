import SeatSelection from './components/SeatSelection'
import TicketHeader from './components/TicketSelectedHeader'
import ShowtimeHeader from './components/TicketSelectedHeader/header'
import styles from './showtime.module.scss'
function Showtime() {
    return (
        <div className={styles.Wrapper}>
            <TicketHeader/>
            <SeatSelection/>
            
        </div>
    )
}

export default Showtime