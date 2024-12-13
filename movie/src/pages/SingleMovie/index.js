import Slider from 'react-slick/lib/slider';
import styles from './SingleMovie.module.scss';
import { useState } from 'react';
import { useParams  } from 'react-router-dom';
import React from 'react';
import { Cinema } from './Api';
import Comment from './components/Comment';
import TicketSchedule from './components/ShowtimeList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useFetchMoviesById from '~/api/useFetchMoviesById';
import Loading from '~/components/Layout/components/Loading/loading';

function SingleMovie() {
    const { data: data, loading, error } = useFetchMoviesById()
    const [style, setstyle] = useState(-1)
    if (loading) {
        return (
            <Loading />
        )
    }
    
    // fetch in here!
    var settings = {
        infinite: true,
        autoplaySpeed: 3500,
        autoplay: true,
        speed: 2000,
        pauseOnHover: true,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    const handlerClick = (index) => {
        setstyle(index)
    }

    return (
        <div className={styles.container}>
            <div className={styles.Imgtitle}>
                <img src="http://demo.amytheme.com/movie/demo/elementor-multi-cinema/wp-content/uploads/sites/3/2022/05/img_22.jpg" />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.poster}>
                    <img src={data.img_url} alt="Movie Poster" />
                </div>
                <div className={styles.details}>
                    <h1>{data.movie_name}</h1>
                    <div className={styles.info}>
                        <span>G</span>
                        <span>02 hours 00 minutes</span>
                        <p>
                            <strong>Actors:</strong> Alexander Catty, Cartin Hollia, Greta Garbo
                        </p>
                        <p>
                            <strong>Director:</strong> Grace Belly, Mae West
                        </p>
                        <p>
                            <strong>Genre:</strong> {data.genre}
                        </p>
                        <p>
                            <strong>Release:</strong> {data.date}
                        </p>
                        <p>
                            <strong>Language:</strong> {data.language}
                        </p>
                        <p>
                            <strong>Star:</strong> {data.star}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.share}>
                <span>Share:</span>
                <a href="#">🔗</a>
                <a href="#">🔗</a>
                <a href="#">🔗</a>
            </div>
            <div className={styles.synopsis}>
                <hr />
                <h2>Synopsis</h2>
                <p>
                    {data.description}
                </p>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                    magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                    quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <p>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                    aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
                <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur.
                </p>
            </div>

            <div className={styles.photo}>
                <h1>Video & Photo</h1>
                <div className={styles.imageSliderCcontainer}>
                    <Slider {...settings}>
                        <div>
                            <img src="http://demo.amytheme.com/movie/demo/elementor-multi-cinema/wp-content/uploads/sites/3/2022/05/img_22.jpg" />
                        </div>
                        <div>
                            <img src={data.img_url} />
                        </div>
                        <div>
                            <img src="http://demo.amytheme.com/movie/demo/elementor-multi-cinema/wp-content/uploads/sites/3/2022/05/img_22.jpg" />
                        </div>
                        <div>
                            <img src="https://i.imghippo.com/files/wt8T01727534685.jpg" />
                        </div>
                        <div>
                            <img src="http://demo.amytheme.com/movie/demo/elementor-multi-cinema/wp-content/uploads/sites/3/2022/05/img_22.jpg" />
                        </div>
                        <div>
                            <img src="https://i.imghippo.com/files/wt8T01727534685.jpg" />
                        </div>
                        <div>
                            <img src="http://demo.amytheme.com/movie/demo/elementor-multi-cinema/wp-content/uploads/sites/3/2022/05/img_22.jpg" />
                        </div>
                        <div>
                            <img src="https://i.imghippo.com/files/wt8T01727534685.jpg" />
                        </div>
                    </Slider>
                </div>
            </div>

            <div className={styles.showtime}>
                <h1>Showtime</h1>
                <div className={styles.cinema}>
                    <div className={styles.select}>
                        <h4>Select A Cinema</h4>
                        <ul>
                            {Cinema.map((item, index) => {
                                return <li
                                    className={styles.lii}
                                    key = {index}
                                    onClick ={() => handlerClick(index)}
                                    style={
                                        index === style
                                            ? {
                                                  backgroundColor: "#b9a1a1"
                                              }
                                            : {}
                                    }
                                >{item.name}</li>;
                            })}
                        </ul>
                    </div>
                    <div className={styles.schedual}>
                        <TicketSchedule id={data.movie_id} />
                    </div>
                    
                </div>
            </div>
            <Comment/>
            
        </div>
    );
}

export default SingleMovie;
