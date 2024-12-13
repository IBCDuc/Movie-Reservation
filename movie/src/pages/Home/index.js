import Bigimg from './components/Bigimg';
import Content from '~/components/Layout/DefaultLayout/Content';
import Articlemovie from './components/Articlemovie';
import MovieCarousel from './components/Test';
import Vid from './components/Vid-Photo';
import LastestNews from './components/LastestNews';
import layoutmodule from './Movie.module.scss'
import { useEffect } from 'react';
import useFetchMovies from '~/api/useFetchMovies';
import { callAllMovies } from '~/services/api';
import Loading from '~/components/Layout/components/Loading/loading';
import { ThemeContext } from '~/ShowtimeSContext';
import { useContext } from 'react';
function Home() {

    // useEffect(() => {
    //     fetchAllMovie();
    // }, [])
    const { data: data, loading, error } = useFetchMovies()
    // const fetchAllMovie = async () => {
    //     const res = await callAllMovies();
    //     console.log(res)
    // }
    
    const { showtimeSelection, setShowtimeSelection } = useContext(ThemeContext);
    console.log(showtimeSelection)
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className="homeWrapper">
            <Bigimg />
            <div className={layoutmodule.container}>
                <Content />
                <Articlemovie data={data} />
            </div>
            <div className={layoutmodule.Carousel}>
                <MovieCarousel data={data} />
            </div>
            <div className={layoutmodule.vidContainer}>
                <Vid />
            </div>
            <div className={layoutmodule.LastestNews}>
                <LastestNews />
            </div>
        </div>
    );
}

export default Home;
