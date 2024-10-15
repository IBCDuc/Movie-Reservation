import React, { useState } from 'react';
import SeatGrid from '../SeatGrid';
import { showtimeApi } from '../../Api/api';
import styles from './MovieSeatSelection.module.scss';
const seatsData = [
    [
        { number: '1.A', status: 'standard' },
        { number: '1.B', status: 'standard' },
        { number: '1.C', status: 'vip' },
        { number: '1.D', status: 'booked' },
    ],
    [
        { number: '2.A', status: 'standard' },
        { number: '2.B', status: 'vip' },
        { number: '2.C', status: 'standard' },
        { number: '2.D', status: 'booked' },
    ],
    [
        { number: '3.A', status: 'standard' },
        { number: '3.B', status: 'vip' },
        { number: '3.C', status: 'standard' },
        { number: '3.D', status: 'booked' },
    ],
    // Add more rows here
];
console.log(showtimeApi[0].showTimes);
const MovieSeatSelection = () => {
    const [selectedDate, setSelectedDate] = useState('May 19');
    const handlerSeat = () => {};
    const [revenue, setRevenue] = useState(0);
    const [movieBaseOnTime, setMovieBaseOnTime] = useState({
        seatIndex: 0,
        movieIndex: 0,
    });
    return (
        <div className={styles.wrapper}>
            <div className={styles.revenue}>
                <h3>Money: {revenue}</h3>
            </div>
            {showtimeApi.map((item, movieIndex) => {
                return (
                    <div class="movieSeatSelection">
                        <div>
                            <img src={item.movieImg} alt="Beauty and the Beast" className="moviePoster" />
                        </div>
                        <div>
                            <div className="movieDetails">
                                <div>
                                    <h1>{item.movieTitle}</h1>
                                    <h2>Cinema: GV PlAZA</h2>
                                </div>
                            </div>
                            <div className="dateSelector">
                                {item.showTimes.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setMovieBaseOnTime({
                                                    seatIndex: index,
                                                    movieIndex: movieIndex,
                                                })
                                            }
                                        >
                                            {item.date}
                                        </button>
                                    );
                                })}
                            </div>
                            <SeatGrid
                                seats={
                                    movieBaseOnTime.movieIndex == movieIndex
                                        ? item.showTimes[movieBaseOnTime.seatIndex].seats
                                        : item.showTimes[0].seats
                                }
                                revenue={revenue}
                                setRevenue={setRevenue}
                            />
                            <div className={styles.buyWrapper}>
                                <button className={styles.addToCart}>
                                    <span class="icon">🛒</span>
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MovieSeatSelection;
