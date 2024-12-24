import Bigimg from './components/Bigimg';
import Content from '~/components/Layout/DefaultLayout/Content';
import Articlemovie from './components/Articlemovie';
import MovieCarousel from './components/Test';
import Vid from './components/Vid-Photo';
import LastestNews from './components/LastestNews';
import layoutmodule from './Movie.module.scss'
import { useEffect, useState } from 'react';
import useFetchMovies from '~/api/useFetchMovies';
import { callAllMovies } from '~/services/api';
import Loading from '~/components/Layout/components/Loading/loading';
import { ThemeContext } from '~/ShowtimeSContext';
import { useContext } from 'react';

import { motion } from 'framer-motion';
function Home() {
    const [movieData, setMovieData] = useState({})
    const [topMovieData, getTopMovieData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchAllMovie();
    }, [])
    
    const fetchAllMovie = async () => {
        const res = await callAllMovies();
       
        if (res?.data) {
            setMovieData(res.data)
            
        }
        setLoading(false)
    }
    const scrollVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    
    const childVariants = {
        initial: {
            opacity: 0,
            y: 50
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6, // Dài hơn để từng phần tử xuất hiện rõ hơn
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };
    
    const pageTransition = {
        type: "spring", // Dùng spring cho hiệu ứng bật nảy tự nhiên hơn
        damping: 20, // Giảm dao động
        stiffness: 100 // Độ cứng vừa phải
    };
    
    const { showtimeSelection, setShowtimeSelection } = useContext(ThemeContext);
    console.log(showtimeSelection)
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
            <motion.div className="homeWrapper">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollVariants}
                >
                    <Bigimg />
                </motion.div>
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollVariants}
                    className={layoutmodule.container}
                >
                    <Content />
                    <Articlemovie data={movieData} />
                </motion.div>
        
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollVariants}
                    className={layoutmodule.Carousel}
                >
                    <MovieCarousel data={movieData} />
                </motion.div>
        
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollVariants}
                    className={layoutmodule.vidContainer}
                >
                    <Vid />
                </motion.div>
        
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollVariants}
                    className={layoutmodule.LastestNews}
                >
                    <LastestNews />
                </motion.div>
            </motion.div>
    );
}


export default Home;
