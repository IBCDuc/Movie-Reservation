// điều phối api
//movies
import { data } from "jquery"
import axios from "../utils/axios-customize"

//movies
export const  callAllMovies = () => {
    return axios.get("/api/movies",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}

export const getTopMoviesByReservations = () => {
    return axios.get("/api/movies/stats/top-movies")
}

export const callMovieById = (id) => {
    return axios.get(`/api/single-movie/${id}`)
}

export const callGetMovieSearch = (queryRT) => {
    return axios.get(`/api/movies/admin${queryRT}`)
}

export const callTopMovies = () => {
    return axios.get("/api/movies/top")
}

export const callGetSingleMovie = (id) => {
    return axios.get(`/api/movies/single-movie/${id}`)
}

//customer
export const callGetAllCustomer = () => {
    return axios.get(`/api/get-user`)
}

export const callAddCustomer = (email, password, display_name, phone_number, detail_address) => {
    const data = new FormData();
    data.append("User_name", display_name);
    data.append("Email", email);
    data.append("Password", password);
    data.append("phone", phone_number);
    data.append("address", detail_address);
    return axios.post(`/api/add-user`, data)
}

export const callGetUserById = (id) => {
    return axios.get(`/api/user/${id}`)
}


export const callDeleteCustomer = (id) => {
    return axios.delete(`admin/delete-user`, {params: id})
}


export const callUpdateInfoUser = (formData, params) => {
return axios.put(`/api/update-info/${params} `, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  });
}

//cinema
export const callGetCinema = () => {
    return axios.get(`/api/cinema`)
}

export const callAddCinema = (name, status, link) => {
    const data = new FormData();
    data.append("name", name);
    data.append("status", status);
    return axios.post( `/api/cinema/add`, data)
}

//seat
export const callGetSeat = () => {
    return axios.get(`/api/seat`)
}
export const callAddSeat = (row, number, type, CinemaId) => {
    const data = new FormData();
    data.append("row", row);
    data.append("numbers", number);
    data.append("type", type);
    data.append("cinemaId", CinemaId)
    return axios.post(`/api/seat/save`, data)
}

export const changeSeatBasedOnShowtime = (show_time, theater_room) => {
    const data = new FormData();
    data.append("cinema_id", theater_room);
    data.append("showtimehour_id", show_time);
    return axios.post(`/api/seat/showtime/update`, data)
}

//Date 
export const callGetShowTimeDate = () => {
    return axios.get(`/api/show-time/date`)
}

export const callAddShowTimeDate = (movie_id, date, status) => {
    const data = new FormData();
    data.append("movie_id", movie_id);
    data.append("date", date);
    data.append("status", status);
    return axios.post(`/api/show-time/add/date`, data )
}

//Hour
export const callGetShowTimeHour = () => {
    return axios.get(`/api/show-time/hour`)
}

export const callAddShowTimeHour = (showtime_date_id, hour, theater_room) => {
    const data = new FormData()
    data.append("showtime_date_id", showtime_date_id)
    data.append('hour', hour)
    data.append('cinema_id', theater_room)
    return axios.post('/api/show-time/add/hour', data)
}

//showtimes 
export const callGetShowTime = (id) => {
    return axios.get(`/api/movies/showtime/${id}`)
}

export const callGetShowTimeCinema = (id, cinemaId) => {
    return axios.get(`/api/movies/showtime/${id}/${cinemaId}`)
}
//reservation
export const callBookSeats = (bookingData) => {
    return axios.post(`/api/reservation/booking`, bookingData)
}

export const callUpdateStatusOrder = (id, status) => {
    const data = new FormData();
    data.append("status", status);
    return axios.put(`/api/reservation/update/status/${id}`, data)
}

export const callGetAllReservation = () => {
    return axios.get(`/api/reservation/get`)
}

export const callGetAllStats = () => {
    return axios.get(`/api/reservation/stats`)
}

export const callDeleteReservation = (id) => {
    return axios.delete(`/api/reservation/delete/${id}`)
}

export const callGetUserReservation = (id) => {
    return axios.get(`/api/reservation/get/user/${id}`)
}

export const callGetUserReservationId = (id) => {
    return axios.get(`/api/reservation/get/${id}`)
}
//auth
export const callLoginUser = (email, password) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    return axios.post(`/api/auth/login`, data)
}

export const callLoginAdmin = (email, password) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    return axios.post(`/admin/login`, data)
}