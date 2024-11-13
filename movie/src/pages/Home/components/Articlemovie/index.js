import styles from './Articlemovie.module.scss';
import { articleitem } from './Api';
import { Link } from 'react-router-dom';
function Articlemovie( {data}  ) {
    return (
        <div className={styles.wrapper}>
            {data.map((item) => {
                return (
                    <div className={styles.data}>
                        <article>
                            <div className={styles.thumb}>
                                <Link to={`/single-movie/${item.movie_id}`}><img src={item.img_url} /></Link>
                            </div>
                            <div className={styles.content}>
                                <h4>{item.Movie_name}</h4>
                                <span>{item.date}</span>
                                <div className={styles.OnImgButton}>
                                    <a href="/">
                                        <span>
                                            <i
                                                class="fa-solid fa-circle-check fa-lg"
                                                style={{ color: '#969d34', marginRight: '8px' }}
                                            ></i>
                                            Reserve
                                        </span>
                                    </a>
                                    <Link to={`/single-movie/${item.movie_id}`}>
                                        <span>
                                            <i
                                                class="fa-solid fa-circle-info fa-lg"
                                                style={{ color: '#7b8b2d', marginRight: '8px' }}
                                            ></i>
                                            Detail
                                        </span>
                                    </Link>
                                </div>
                                <div className={styles.openclick}>
                                    <h2 className={styles.titleOpen}>{item.movie_name}</h2>
                                    <div className={styles.descOpen}>
                                        <p><span>Release: </span>{item.movie_date}</p>
                                        <p><span>Genre: </span>{item.genre}</p>
                                        <p><span>Duration: </span>{item.duration}</p>
                                        <p><span>Language: </span>{item.language}</p>
                                </div>
                                    
                                </div>
                            </div>
                        </article>
                    </div>
                );
            })}
        </div>
    );
}

export default Articlemovie;
