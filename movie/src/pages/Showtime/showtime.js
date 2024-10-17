import SeatSelection from './components/SeatSelection';
import TicketHeader from './components/TicketSelectedHeader';
import ShowtimeHeader from './components/TicketSelectedHeader/header';
import styles from './showtime.module.scss';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '~/ShowtimeSContext';
import { showtimeApi } from './Api/api';
import Loading from '~/components/Layout/components/Loading/loading';
function Showtime() {
    const [selectedTime, setSelectedTime] = useState('');
    const { showtimeSelection, setShowtimeSelection } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            if (!selectedTime) {
                setLoading(true);
            }
        }, 500)
        return setSelectedTime(showtimeSelection.times[0].time);

    }, [showtimeSelection]);
    if (loading === false) {
        return <Loading />;
    }
    return (
        <div className={styles.Wrapper}>
            <ShowtimeHeader selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            <TicketHeader selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            <SeatSelection selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </div>
    );
}

export default Showtime;
