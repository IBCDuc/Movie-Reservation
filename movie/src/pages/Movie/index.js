import Movies from "./components/Movies"
import styles from "./Movie.module.scss"
import Loading from "~/components/Layout/components/Loading/loading"
import useFetchMovies from "~/api/useFetchMovies"
function Movie() {
    const { data: data, loading, error } = useFetchMovies()
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <div className={styles.fontImage}>
                <img src="https://i.imghippo.com/files/rcKRS1727877489.jpg" />
                <h2>Now Playing</h2>
            </div>
            <Movies data = {data}/>
        </div>
    )
}

export default Movie;