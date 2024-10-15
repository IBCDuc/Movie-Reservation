import './header.module.scss';
import img from './header.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext, Url } from '~/UseContext';
function Header() {
    const {url, seturl} = useContext(ThemeContext)
    const handlerClick = (props) => {
        seturl(props);
    };

    return (
        <header className={img.wrapper}>
            <div className={img.inner}>
                <div class={img.logo}>
                    <img src="https://i.imghippo.com/files/grryP1727434394.png"></img>
                </div>

                <nav>
                    <ul>
                        <li onClick={() => handlerClick('/')}>
                            <Link to="/" className={url === '/' ? `${img.active}` : ''}>
                                HOME
                            </Link>
                        </li>
                        <li onClick={() => handlerClick('/movie')}>
                            <Link to="/movie" className={url === '/movie' ? `${img.active}` : ''}>
                                MOVIE
                            </Link>
                        </li>
                        <li onClick={() => handlerClick('/single-movie')}>
                            <Link to="/single-movie" className={url === '/single-movie' ? `${img.active}` : ''}>
                                SINGLE MOVIE
                            </Link>
                        </li>
                        <li onClick={() => handlerClick('/show-time')}>
                            <Link to="/show-time" className={url === '/show-time' ? `${img.active}` : ''}>
                                SHOWTIME
                            </Link>
                        </li>
                        <li>
                            <Link to="top-rate">TOP RATED</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
