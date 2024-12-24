import React, { useState } from 'react';
import styles from "./Movies.module.scss";
import { articleitem } from "../Pagnigation/Api";
import PaginatedItems from "../Pagnigation";
import MovieFilter from "../Filter";
import Movie from '../..';
import {motion} from 'framer-motion';
function Movies( {data, data2} ) {
    
    return (
        <motion.div 
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
           
            <PaginatedItems itemsPerPage={5} data={data}/>
            
            <div className={styles.topMovie}>
                <motion.div 
                    className={styles.banner}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <img src='https://c7.alamy.com/comp/2C7WH0B/interstellar-2014-directed-by-christopher-nolan-and-starring-matthew-mcconaughey-anne-hathaway-jessica-chastain-and-john-lithgow-in-a-dystopian-future-astronauts-explore-a-wormhole-in-space-in-search-for-a-new-home-for-mankind-in-a-distant-galaxy-2C7WH0B.jpg'/>
                </motion.div>
                <h2>Top Movie</h2>
                {data2?.map((item) => (
                    <motion.div 
                    key={item.id} 
                    className={styles.sideEachMovie}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    >
                        <div className={styles.imgSideContent}>
                            <img src={item.img_url} alt={item.movie_name} />
                        </div>
                        <div className={styles.sideContent}>
                            <h3>{item.movie_name}</h3>
                            <span>Duration: {item.duration}</span>
                            <span>{item.genre}</span>
                        </div>
                    </motion.div>
                ))}
                <div className={styles.bottomBanner}>
                    <img src="https://i.imghippo.com/files/AFZaR1729317276.jpg" />    
                </div>
            </div>
        

            <div className={styles.pagenigation}>
                1 2 3 4
            </div>
        </motion.div>
    );
}

export default Movies;
