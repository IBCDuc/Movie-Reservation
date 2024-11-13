import React, { useState } from 'react';
import styles from './filter.module.scss'; // SCSS module

const MovieFilter = ({ categories, onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        onFilter(category); // Gửi danh mục đã chọn ra ngoài để lọc danh sách phim
    };

    return (
        <div className={styles.filterContainer}>
            <label htmlFor="categoryFilter" className={styles.filterLabel}>
            <i class="fa-solid fa-filter" style={{marginRight: "5px"}}></i>Filter by:
            </label>
            <div className={styles.select}>
                <select
                    id="categoryFilter"
                    className={styles.filterSelect}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Genre</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    id="categoryFilter"
                    className={styles.filterSelect}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Release year</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    id="categoryFilter"
                    className={styles.filterSelect}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Price</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    id="categoryFilter"
                    className={styles.filterSelect}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Rating</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MovieFilter;
