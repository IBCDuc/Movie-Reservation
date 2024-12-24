import React, { useState } from 'react';
import styles from './filter.module.scss';

const MovieFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        price: '',
        rating: ''
    });

    const filterOptions = {
        genre: ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Adventure', 'Thriller'],
        year: ['2024', '2023', '2022', '2021', '2020'],
        price: ['Under 50k', '50k-100k', '100k-150k', 'Over 150k'],
        rating: ['5 Stars', '4 Stars & Up', '3 Stars & Up']
    };

    const handleFilterChange = (type, value) => {
        const newFilters = { ...filters, [type]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterHeader}>
                <i className="fa-solid fa-filter"></i>
                <span>Filter Movies</span>
            </div>
            
            <div className={styles.filterGroup}>
                {Object.entries(filterOptions).map(([type, options]) => (
                    <div key={type} className={styles.filterItem}>
                        <select
                            value={filters[type]}
                            onChange={(e) => handleFilterChange(type, e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="">{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieFilter;