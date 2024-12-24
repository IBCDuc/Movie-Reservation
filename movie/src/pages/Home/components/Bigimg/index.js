import styles from './bigimg.module.scss';
import { useEffect, useState } from 'react';
import { multidisplay } from './Api';

function Bigimg() {
    const [buttonStatus, setStatus] = useState(1);
    const liArray = [1, 2, 3, 4, 5];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(prev => prev >= multidisplay.length ? 1 : prev + 1);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (buttonStatus < 1) {
            setStatus(multidisplay.length);
        }
        if (buttonStatus > multidisplay.length) {
            setStatus(1);
        }
    }, [buttonStatus]);

    const prevArrow = () => {
        setStatus((prev) => prev - 1);
    };
    
    const nextArrow = () => {
        setStatus((prev) => prev + 1);
    };

    return (
        <div className={styles.wrapper}>
            <button className={styles.slickPrev} onClick={prevArrow}>
                &lt;
            </button>

            {multidisplay?.map((item) => (
                <div
                    className={`${styles.MultiDisplay} ${buttonStatus === item.id ? styles.active : ''}`}
                    key={item.id}
                >
                    <div className={styles.slide}>
                        <a>
                            <img src={item.img} alt={item.name} />
                        </a>
                    </div>
                    <div className={styles.TextOnImg}>
                        <h1>{item.name}</h1>
                        <div className={styles.OnImgDate}>
                            <h3>From</h3>
                            <h3 style={{ fontWeight: '750' }}>{item.date}</h3>
                        </div>
                        <p>{item.content}</p>
                        <div className={styles.OnImgButton}>
                            <a href="/">
                                <span>
                                    <i className="fa-solid fa-circle-check fa-lg" 
                                       style={{ color: '#969d34', marginRight: '8px' }}></i>
                                    Reserve
                                </span>
                            </a>
                            <a href="/">
                                <span>
                                    <i className="fa-solid fa-circle-info fa-lg" 
                                       style={{ color: '#7b8b2d', marginRight: '8px' }}></i>
                                    Detail
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            ))}

            <button className={styles.slickNext} onClick={nextArrow}>
                &gt;
            </button>
        </div>
    );
}

export default Bigimg;