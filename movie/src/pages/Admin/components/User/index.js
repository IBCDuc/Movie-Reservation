import React, { useEffect, useState, useLayoutEffect } from "react";
import UserRow from "./components/UserRow";
import styles from "./User.module.scss";
import Loading from "~/components/Layout/components/Loading/loading";

const User = () => {
  const [products, setProducts] = useState([]);
  const [loadingLogic, setLoadingLogic] = useState(false)

  useEffect(() => {
    const handleGetUser = async () => {
      setLoadingLogic(false)
      
      try {
        
        const respone= await fetch("http://localhost:8000/api/get-user")
        if (!respone.ok) {
          throw new Error(`Respone status: ${respone.status}`)
        }
        const userData = await respone.json()
        setProducts(userData)
      } catch(err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          setLoadingLogic(true)
        },200)
        
      }
    }
    handleGetUser()
  },[])

  if (!loadingLogic) {
    return <Loading />
  }


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
            <th><br/></th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <UserRow key={product.user_id} product={product} />
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
