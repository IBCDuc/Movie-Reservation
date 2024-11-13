import Header from '~/components/Layout/components/Header/header';
import layoutmodule from  './DefaultLayout.module.scss'
import Footer from '../components/Footer';
import Showtime from '~/pages/Showtime/showtime';
import MyReservations from '~/pages/Reservation';
import ShowtimeHeader from '~/pages/Showtime/components/TicketSelectedHeader/header';
function DefaultLayoutShowtime() {
    return (
        <div className= {layoutmodule.wrapper}>
            
            <div className={layoutmodule.Content}>
                <Showtime />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayoutShowtime;