import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { articleitem } from './Api';
// Example items, to simulate fetching from another resources.
import styles from './pagnigationM.module.scss';
import './stylepage.scss';
import MovieFilter from '../Filter';
import { Link } from 'react-router-dom';
import useFetchMovies from '~/api/useFetchMovies';
function Items({ currentItems, data }) {
    
    const [filteredMovies, setFilteredMovies] = useState(data); // Lưu trữ danh sách phim đã lọc
    const categories = ['Adventure', 'Drama', 'Thriller', 'Sci-Fi']; // Các thể loại phim có thể lọc

    const filterMovies = (category) => {
        if (category === '') {
            setFilteredMovies(currentItems); // Hiển thị tất cả phim nếu không chọn danh mục
        } else {
            const filtered = currentItems.filter((item) => item.genre === category);
            setFilteredMovies(filtered);
        }
    };

    return (
        <div className={styles.Movies}>
            <MovieFilter categories={categories} onFilter={filterMovies} />
            {filteredMovies?.map((item,index) => {
                return (
                    <div key ={index} className={styles.EachMovie}>
                        <div className={styles.imgContent}>
                            <Link to={`/single-movie/${item.movie_id}`}><img src={item.img_url} /></Link>
                        </div>
                        <div className={styles.info}>
                        <Link to={`/single-movie/${item.movie_id}`}><h1>{item.movie_name}</h1></Link>
                        <div className={styles.content}>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, ...</p>
                        </div>
                        <span>G</span>
                        <span>{item.duration}</span>
                        <p>
                            <strong>Actors:</strong> Alexander Catty, Cartin Hollia, Greta Garbo
                        </p>
                        <p>
                            <strong>Director:</strong> Grace Belly, Mae West
                        </p>
                        <p>
                            <strong>Genre:</strong> {item.genre}
                        </p>
                        <p>
                            <strong>Release:</strong> {item.movie_date}
                        </p>
                        <p>
                            <strong>Language:</strong> {item.language}
                        </p>
                        <p>
                            <strong>IMDB Rating:</strong> 8.5
                        </p>
                    </div>
                    </div>
                );
            })}
        </div>
    );
}

function PaginatedItems( { itemsPerPage, data} ) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);

    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <div className={styles.pagnigation}>
            <Items currentItems={currentItems} data={data}/>
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

// Add a <div id="container"> to your HTML to see the component rendered.
export default PaginatedItems;
