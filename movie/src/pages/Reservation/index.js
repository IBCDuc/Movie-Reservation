import React, { useState } from 'react';
import './reservation.css'; // Import the CSS file

const MyReservations = () => {
    const [reservations, setReservations] = useState([
        {
            id: 1,
            title: "Despicable Me 4",
            date: "06/09/2024 18:00",
            seat: 2,
            reservedOn: "06/09/2024 08:41",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunU7e8Sl_MXV5t6wO-QqKY8jZBCeT-HMI3w&s"
        },
        {
            id: 2,
            title: "Inside Out 2",
            date: "10/09/2024 06:00",
            seat: 2,
            reservedOn: "06/09/2024 08:39",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunU7e8Sl_MXV5t6wO-QqKY8jZBCeT-HMI3w&s"
        },
        {
            id: 3,
            title: "A Quiet Place: Day One",
            date: "04/09/2024 13:40",
            seat: 7,
            reservedOn: "04/09/2024 12:41",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunU7e8Sl_MXV5t6wO-QqKY8jZBCeT-HMI3w&s"
        },
        // Add more reservations as needed
    ]);

    const cancelReservation = (id) => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
    };

    return (
        <div className="reservations">
            <h1>My Reservations</h1>
            <div className="reservation-grid">
                {reservations?.map(reservation => (
                    <div key={reservation.id} className="reservation-card">
                        <img src={reservation.imageUrl} alt={reservation.title} className="movie-poster" />
                        <div className="reservation-info">
                            <h2>{reservation.title}</h2>
                            <p>Date: {reservation.date}</p>
                            <p>Seat: {reservation.seat}</p>
                            <p>Reserved on: {reservation.reservedOn}</p>
                            <button className="cancel-btn" onClick={() => cancelReservation(reservation.id)}>
                                Cancel Reservation
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReservations;
