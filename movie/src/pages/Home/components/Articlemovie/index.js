import styles from './Articlemovie.module.scss';
import { articleitem } from './Api';
import { Link } from 'react-router-dom';
function Articlemovie( {data}  ) {
    return (
        <div className={styles.wrapper}>
            {data?.map((item) => {
                return (
                    <div className={styles.data}>
                        <div className={styles.thumb}>
                            <Link to={`/single-movie/${item.movie_id}`}>
                                <img src={item.img_url} alt={item.Movie_name} />
                            </Link>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.movieInfo}>
                                <h4>{item.Movie_name}</h4>
                                <span>Genre: {item.genre}</span><br/>
                                <span>Rating: {item.star}</span><br/>
                                <span>Release: {item.create_at}</span>
                                
                            </div>
                            <div className={styles.OnImgButton}>
                                <Link to={`/single-movie/${item.movie_id}`}>
                                    <span>
                                        <i className="fa-solid fa-circle-info fa-lg"></i>
                                        Detail
                                    </span>
                                </Link>
                                <Link to="/show-time">
                                    <span>
                                        <i className="fa-solid fa-circle-check fa-lg"></i>
                                        Reserve
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Articlemovie;
