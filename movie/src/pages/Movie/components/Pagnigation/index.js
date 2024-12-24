import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import MovieFilter from '../Filter';
import styles from './pagnigationM.module.scss';
import './stylepage.scss';
import { callGetSingleMovie } from '~/services/api';

function Items({ currentItems }) {

    const truncateText = (text, limit) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    };

    return (
        <div className={styles.Movies}>
            {currentItems?.map((item, index) => (
                <div key={index} className={styles.EachMovie}>
                    <div className={styles.imgContent}>
                        <Link to={`/single-movie/${item.Movie_id}`}>
                            <img src={item.img_url} alt={item.Movie_name} />
                        </Link>
                    </div>
                    <div className={styles.info}>
                        <Link to={`/single-movie/${item.Movie_id}`}>
                            <h1>{item.Movie_name}</h1>
                        </Link>
                        <div className={styles.content}>
                            <p>{truncateText(item.description, 100)}</p>
                        </div>
                        <span>G</span>
                        <span>{item.duration}</span>
                        <p><strong>Actors:</strong> Alexander Catty, Cartin Hollia, Greta Garbo</p>
                        <p><strong>Director:</strong> Grace Belly, Mae West</p>
                        <p><strong>Genre:</strong> {item.genre}</p>
                        <p><strong>Release:</strong> {item.movie_date}</p>
                        <p><strong>Language:</strong> {item.language}</p>
                        <p><strong>IMDB Rating:</strong> 8.5</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PaginatedItems({ itemsPerPage, data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [filteredMovies, setFilteredMovies] = useState(data); // Lưu trữ danh sách phim sau khi lọc
    const [currentPageMovies, setCurrentPageMovies] = useState([]); // Lưu trữ phim trong trang hiện tại
    const [categoryFilter, setCategoryFilter] = useState(''); // Lọc theo danh mục

    const categories = ['Adventure', 'Drama', 'Thriller', 'Sci-Fi']; // Các danh mục có thể lọc

    useEffect(() => {
        // Lọc phim dựa trên danh mục
        const filtered = categoryFilter
            ? data.filter((item) => item.genre === categoryFilter)
            : data;

        setFilteredMovies(filtered);
        setItemOffset(0); // Reset về trang đầu tiên khi lọc
    }, [categoryFilter, data]);

    useEffect(() => {
        // Cập nhật danh sách phim trên trang hiện tại
        const endOffset = itemOffset + itemsPerPage;
        setCurrentPageMovies(filteredMovies.slice(itemOffset, endOffset));
    }, [itemOffset, filteredMovies, itemsPerPage]);

    const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);

    const handleFilter = (filters) => {
        let filtered = data;

        if (filters.genre) {
            filtered = filtered.filter(movie => movie.genre.includes(filters.genre));
        }
        if (filters.year) {
            filtered = filtered.filter(movie => movie.movie_date.includes(filters.year));
        }
        if (filters.rating) {
            const ratingValue = parseInt(filters.rating);
            filtered = filtered.filter(movie => movie.rating >= ratingValue);
        }

        setFilteredMovies(filtered);
        setItemOffset(0);
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredMovies.length;
        setItemOffset(newOffset);
    };

    return (
        <div className={styles.pagnigation}>
            {/* Bộ lọc danh mục */}
            <MovieFilter
                categories={categories}
                onFilter={handleFilter}
            />
            {/* Danh sách phim */}
            <Items currentItems={currentPageMovies} />
            {/* Phân trang */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="react-paginate"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="selected"
                disabledClassName="disabled"
            />
        </div>
    );
}

export default PaginatedItems;
