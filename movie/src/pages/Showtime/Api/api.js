export const showtimeApi = [
    {
        movieId: '1234', // ID của bộ phim
        movieTitle: 'Inception',
        movieImg: 'https://i.imghippo.com/files/wt8T01727534685.jpg',
        showTimes: [
            {
                date: '2024-10-15',
                times: [
                    {
                        time: '04:10', // Khung giờ chiếu
                        seats: [
                            {
                                seatNumber: 'A1',
                                price: 100000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'A2',
                                price: 100000,
                                isBooked: true,
                            },
                            {
                                seatNumber: 'A3',
                                price: 120000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'A4',
                                price: 100000,
                                isBooked: false,
                            },
                        ],
                    },
                    {
                        time: '07:30', // Khung giờ chiếu khác
                        seats: [
                            {
                                seatNumber: 'B1',
                                price: 120000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'B2',
                                price: 120000,
                                isBooked: true,
                            },
                            {
                                seatNumber: 'B3',
                                price: 100000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'B4',
                                price: 100000,
                                isBooked: true,
                            },
                        ],
                    },
                    {
                        time: '10:50', 
                        seats: [
                            {
                                seatNumber: 'C1',
                                price: 120000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'C2',
                                price: 120000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'C3',
                                price: 100000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'C4',
                                price: 100000,
                                isBooked: true,
                            },
                        ],
                    }
                ],
            },
            {
                date: '2024-10-16',
                times: [
                    {
                        time: '12:00',
                        seats: [
                            {
                                seatNumber: 'C1',
                                price: 100000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'C2',
                                price: 120000,
                                isBooked: true,
                            },
                            {
                                seatNumber: 'C3',
                                price: 120000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'C4',
                                price: 100000,
                                isBooked: false,
                            },
                        ],
                    },
                    {
                        time: '20:00',
                        seats: [
                            {
                                seatNumber: 'D1',
                                price: 150000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'D2',
                                price: 150000,
                                isBooked: true,
                            },
                            {
                                seatNumber: 'D3',
                                price: 150000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'D4',
                                price: 150000,
                                isBooked: false,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        movieId: '999', // ID của bộ phim
        movieTitle: 'Hope it work',
        movieImg: 'https://i.imghippo.com/files/wt8T01727534685.jpg',
        showTimes: [
            {
                date: '2024-10-20',
                times: [
                    {
                        time: '10:00',
                        seats: [
                            {
                                seatNumber: 'E1',
                                price: 100000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'E2',
                                price: 120000,
                                isBooked: true,
                            },
                            {
                                seatNumber: 'E3',
                                price: 120000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'E4',
                                price: 100000,
                                isBooked: false,
                            },
                        ],
                    },
                    {
                        time: '15:00',
                        seats: [
                            {
                                seatNumber: 'F1',
                                price: 130000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'F2',
                                price: 130000,
                                isBooked: true,
                            },
                            {
                                seatNumber: 'F3',
                                price: 130000,
                                isBooked: false,
                            },
                            {
                                seatNumber: 'F4',
                                price: 130000,
                                isBooked: false,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
