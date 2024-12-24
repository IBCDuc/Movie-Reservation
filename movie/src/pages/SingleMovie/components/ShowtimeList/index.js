import React from 'react';
import sty from './TicketSchedule.module.scss'; // Import CSS cho styling
import { showtimeApi } from '~/pages/Showtime/Api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ThemeContext } from '~/ShowtimeSContext';
import Loading from '~/components/Layout/components/Loading/loading';
import { callGetShowTime, callGetShowTimeCinema, callGetShowTimeDate } from '~/services/api';

import { useDispatch } from 'react-redux';
import { setSchedule, setMovieName } from '~/redux/showtimeAD/showtimeSlice';

const TicketSchedule = ( {  id, cinemaId } ) => {
  console.log(id)
  console.log(cinemaId)

  const dispatch = useDispatch(); // Khởi tạo dispatch để gửi action
  const handleBuyTicket = (schedule, movieTitle) => {
    dispatch(setSchedule(schedule)); // Gửi dữ liệu schedule vào Redux
    dispatch(setMovieName(movieTitle));
  };

  const [showtimeData, setShowtimeData] = useState({})
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      fetchAllMovie();
    }, [cinemaId]);

  const fetchAllMovie = async () => {
    try {
      const res = await callGetShowTimeCinema(id, cinemaId); // Gọi API với id phim
      console.log(res)
      if (res) {
        setShowtimeData(res);
      }
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (time, date) => {
    const fullDateTime = new Date(`${date}T${time}`);
    return fullDateTime.toLocaleString('en-US', {
      weekday: 'long', // Hiển thị ngày trong tuần
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!showtimeData || !showtimeData.showTimes?.length) {
    return <div>No showtimes available.</div>;
}

return (
    <div className={sty.ticketSchedule}>
        {showtimeData.showTimes.map((schedule, index) => (
            <div key={index} className={sty.scheduleItem}>
                <h3>
                    {new Date(schedule.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </h3>
                <div className={sty.times}>
                    {schedule.times.map((time, i) => (
                        <li key={i} className={sty.timeButton}>
                            <span>{time.time}</span>
                        </li>
                    ))}
                </div>
                <button className={sty.buyButton}>
                    <Link to="/show-time" onClick={() => handleBuyTicket(schedule,showtimeData.movieTitle )}>
                        BUY TICKET
                    </Link>
                </button>
            </div>
        ))}
    </div>
);
};

export default TicketSchedule;
