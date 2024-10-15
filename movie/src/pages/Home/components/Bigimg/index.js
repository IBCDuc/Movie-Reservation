import styles from './bigimg.module.scss';
import { useEffect, useReducer, useState } from 'react';
import { multidisplay } from './Api';
function Bigimg() {
    const [buttonStatus, setStatus] = useState(1);
    const liArray = [1, 2, 3, 4, 5];
    const [slideShow, setSlideShow] = useState(1);
    const url = 'http://localhost:8000/fake-api';
    
    const getData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log(`this function is err: ${err.message}`);
        }
    };
    useEffect(() => {
        getData(url);
    }, []);

    useEffect(() => {
        if (buttonStatus < 1) {
            setStatus(multidisplay.length);
        }
        if (buttonStatus > multidisplay.length) {
            setStatus(1);
        }
    }, [buttonStatus]);

    /* useEffect(() => {
        console.log("time")
        setTimeout(() => {
            setStatus(prev => prev + 1)
        }, 5000)
    }) */

    const prevArrow = () => {
        setStatus((prev) => prev - 1);
    };
    const nextArrow = () => {
        setStatus((prev) => prev + 1);
    };

    return (
        <div className={styles.wrapper}>
            <button class={styles.slickPrev} onClick={prevArrow} disabled>
                &lt;
            </button>

            {multidisplay.map((item) => {
                return (
                    <div
                        className={styles.MultiDisplay}
                        key={item.id}
                        style={
                            buttonStatus === item.id
                                ? {
                                      display: 'block',
                                      transition: 'all 0.5s',
                                  }
                                : {}
                        }
                    >
                        <div className={styles.slide}>
                            <a>
                                <img src={item.img}></img>
                            </a>
                        </div>
                        <div className={styles.TextOnImg}>
                            <h1>{item.name}</h1>
                            <div className={styles.OnImgDate}>
                                <h3>From</h3>
                                <h3 style={{ fontWeight: '750' }}>{item.date}</h3>
                            </div>
                            <p>{item.content}</p>
                            <br />

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
                                <a href="/">
                                    <span>
                                        <i
                                            class="fa-solid fa-circle-info fa-lg"
                                            style={{ color: '#7b8b2d', marginRight: '8px' }}
                                        ></i>
                                        Detail
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}

            <button class={styles.slickNext} onClick={nextArrow}>
                &gt;
            </button>

            <ul className={styles.pagination}>
                {liArray.map((item) => {
                    return (
                        <li key={item}>
                            <button
                                key={item}
                                style={item === buttonStatus ? { background: '#884c4c' } : {}}
                                onClick={() => {
                                    setStatus(item);
                                }}
                            >
                                {item}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Bigimg;
