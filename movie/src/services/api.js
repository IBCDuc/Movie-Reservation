// điều phối api
//movies
import axios from "../utils/axios-customize"

//movies
export const callAllMovies = () => {
    return axios.get("/api/movies")
}

export const callMovieById = (id) => {
    return axios.get(`/api/single-movie/${id}`)
}

export const callGetMovieSearch = (queryRT) => {
    return axios.get(`/api/movies/admin${queryRT}`)
}

//customer
export const callGetAllCustomer = () => {
    return axios.get(`/api/get-user`)
}

export const callDeleteCustomer = (id) => {
    return axios.delete(`admin/delete-user`, {params: id})
}

//cinema
export const callGetCinema = () => {
    return axios.get(`/api/cinema`)
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

export const callAddShowTimeHour = (showtime_date_id, hour) => {
    const data = new FormData()
    data.append("showtime_date_id", showtime_date_id)
    data.append('hour', hour)
    return axios.post('/api/show-time/add/hour', data)
}