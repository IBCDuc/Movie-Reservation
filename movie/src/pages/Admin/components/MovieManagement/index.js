import React, { useState } from "react";
import ProductRow from "./components/ProductRow";
import styles from "./MovieManagement.module.scss";

const MovieManagement = () => {
  const [products, setProducts] = useState([
    {
      _id: 12,
      categories: "Movies,Tools",
      name: "Intelligent Granite Car",
      reservation: 37,
      revenue: "1000$",
      seat: "12/30",
      image: "https://i.imghippo.com/files/WBb071727452694.jpg",
      createdAt: "Dec 16, 5:29 AM"
    },
    {
        _id: 13,
        categories: "Movies,Tools",
        name: "Intelligent Granite Car",
        reservation: 37,
        revenue: "1000$",
        seat: "12/30",
        image: "https://i.imghippo.com/files/WBb071727452694.jpg",
        createdAt: "Dec 16, 5:29 AM"
      }
    // Add more products here
  ]);

  return (
    <div className={styles.productTable}>
      <div className={styles.tableHeader}>
        <button className={styles.createBtn}>+ Create</button>
        <button className={styles.reloadBtn}>Reload</button>
        <input type="text" placeholder="Name" />
        
        <button className={styles.searchBtn}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>_id</th>
            <th>Categories</th>
            <th>name</th>
            <th>reservetion</th>
            <th>revenue</th>
            <th>seat</th>
            <th>image</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product._id} product={product} />
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button>{"<<"}</button>
        <button>{">>"}</button>
      </div>
    </div>
  );
};

export default MovieManagement;
