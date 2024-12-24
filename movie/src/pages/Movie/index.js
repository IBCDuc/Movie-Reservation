import Movies from "./components/Movies"
import styles from "./Movie.module.scss"
import Loading from "~/components/Layout/components/Loading/loading"
import useFetchMovies from "~/api/useFetchMovies"
import { useState, useEffect } from "react"
import { callAllMovies, callTopMovies } from "~/services/api"
function Movie() {
    // const { data: data, loading, error } = useFetchMovies()
        const [movieData, setMovieData] = useState({})
        const [topMovieData, setTopMovieData] = useState({})
        const [loading, setLoading] = useState(true)
        useEffect(() => {
            fetchAllMovie();
        }, [])
        
        const fetchAllMovie = async () => {
            const res = await callAllMovies();
            const res2 = await callTopMovies();
            if (res?.data) {
                setMovieData(res.data)
                setTopMovieData(res2.data)
            }
            setLoading(false)
        }
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <div className={styles.fontImage}>
                <img src="https://i.imghippo.com/files/rcKRS1727877489.jpg"/>
                <h2>Now Playing</h2>
            </div>
            <Movies data = {movieData} data2 = {topMovieData}/>
        </div>
    )
}

export default Movie;