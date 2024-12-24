import sty from './showtimeheader.module.scss';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '~/ShowtimeSContext';
import { useSelector } from 'react-redux';

function ShowtimeHeader({ showtimeData }) {
    // Kiểm tra showtimeData trước khi truy cập
    console.log(showtimeData);
    const movieName = useSelector((state) => state.showtime.movieName);
    if (!showtimeData || !showtimeData.date || !showtimeData.times) {
        return <div>Loading or missing data...</div>;
    }

    // Kiểm tra thông tin showtime
    const { cinemaName, available, time, seats } = showtimeData.times;
    // Đảm bảo time được định dạng chính xác
    

    return (
        <header className={sty.movieInfo}>
            <div className={sty.leftback}>
                <a><i className="fa-solid fa-arrow-left fa-xl"></i></a>
            </div>
            <h3>
                {movieName} <span className={sty.rating}>UA</span>
            </h3>
            <p>
                {showtimeData.times[0].cinemaName}: {new Date(showtimeData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}, {showtimeData.times[0].time}
            </p>
        </header>
    );
}

export default ShowtimeHeader;
