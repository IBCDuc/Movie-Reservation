import SeatSelection from './components/SeatSelection';
import TicketHeader from './components/TicketSelectedHeader';
import ShowtimeHeader from './components/TicketSelectedHeader/header';
import styles from './showtime.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '~/ShowtimeSContext';
import { showtimeApi } from './Api/api';
import Loading from '~/components/Layout/components/Loading/loading';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Showtime() {
    const { id } = useParams()
    const schedule = useSelector((state) => state.showtime.schedule);
    
    const {value, value2} = useContext(ThemeContext)
    const [showtimeSelection, setShowtimeSelection] = value 
    const [initReservationDate, setInitReservationDate] = value2
    
    const [movieData, setMovieData] = useState({})

    const [loading, setLoading] = useState(false);
    // const [isReloading, setIsReloading] = useState(false);
    const navigate = useNavigate()

    console.log(schedule)
    if (!schedule) {
        return <div>No schedule data available.</div>;
    }
   
    // useEffect(() => {
        
    //     setTimeout(() => {
    //         if (initReservationDate) {
    //             setLoading(true);
    //         }
    //     }, 500)

    //     return 
        
    // }, [showtimeSelection]);



    // useLayoutEffect(() => {
    //     try {
    //         if (showtimeSelection?.times?.length > 0) {
    //             return setSelectedTime(showtimeSelection.times[0].time);
    //         }
    //     } catch(err) {
    //         console.log(`loi o day, dang loi ${err}`)
    //     }
    // }, [showtimeSelection]);

    // if (loading === false) {
    //     return <Loading />;
    // }
    return (
        <div className={styles.Wrapper}>
            {/* <ShowtimeHeader selectedTime={initReservationDate} setSelectedTime={setInitReservationDate} initValue={initReservationDate} />
            <TicketHeader selectedTime={initReservationDate} setSelectedTime={setInitReservationDate} initValue={initReservationDate} />
            <SeatSelection selectedTime={initReservationDate} setSelectedTime={setInitReservationDate} initValue={initReservationDate} /> */}
            <ShowtimeHeader showtimeData={schedule} />
            <TicketHeader showtimeData={schedule}   />
            <SeatSelection showtimeData={schedule}  />
        </div>
    );
}

export default Showtime;
