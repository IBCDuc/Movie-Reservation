import Header from '~/components/Layout/components/Header/header';
import layoutmodule from  './DefaultLayout.module.scss'
import Footer from '../components/Footer';
import Home from '~/pages/Home';
import Movie from '~/pages/Movie';
import PaginatedItems from '~/pages/Movie/components/Pagnigation';
import SingleMovie from '~/pages/SingleMovie';
import Showtime from '~/pages/Showtime';
import Admin from '~/pages/Admin';
import { Outlet } from 'react-router-dom';
function DefaultLayouts() {
    return (
        <div className= {layoutmodule.wrapper}>
            <Header/>
            <div className={layoutmodule.Content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayouts;
