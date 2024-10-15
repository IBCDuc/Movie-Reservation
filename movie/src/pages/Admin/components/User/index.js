import React, { useState } from "react";
import UserRow from "./components/UserRow";
import styles from "./User.module.scss";

const User = () => {
  const [products, setProducts] = useState([
    {
      _id: 12,
      username: "Đức",
      type: "user",
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
            <th>Username</th> 
            <th>Type</th>
            <th>Created At</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <UserRow key={product._id} product={product} />
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

export default User;
