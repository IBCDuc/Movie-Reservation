import SeatSelection from './components/SeatSelection';
import TicketHeader from './components/TicketSelectedHeader';
import ShowtimeHeader from './components/TicketSelectedHeader/header';
import styles from './showtime.module.scss';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '~/ShowtimeSContext';
import { showtimeApi } from './Api/api';
import Loading from '~/components/Layout/components/Loading/loading';
import { useNavigate } from 'react-router-dom';


function Showtime() {
    const [selectedTime, setSelectedTime] = useState("04:10");
    const { showtimeSelection, setShowtimeSelection } = useContext(ThemeContext);
    console.log(showtimeSelection)
    const [loading, setLoading] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const navigate = useNavigate()
    setSelectedTime(showtimeSelection)
    
    useEffect(() => {
        setTimeout(() => {
            if (!selectedTime) {
                setLoading(true);
            }
        }, 500)

        return 
        
    }, [showtimeSelection]);



    // useLayoutEffect(() => {
    //     try {
    //         if (showtimeSelection?.times?.length > 0) {
    //             return setSelectedTime(showtimeSelection.times[0].time);
    //         }
    //     } catch(err) {
    //         console.log(`loi o day, dang loi ${err}`)
    //     }
    // }, [showtimeSelection]);
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
