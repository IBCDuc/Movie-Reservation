import React from "react";
import rowStyles from "./UserRow.module.scss";

const UserRow = ({ product }) => {
  return (
    <tr>
      <td>{product._id}</td>
      <td>{product.username}</td>
      <td>{product.name}</td>
      <td>{product.type}</td>
      <td>{product.createdAt}</td>
      <td>
        <button className={rowStyles.viewBtn}>View</button>
        <button className={rowStyles.editBtn}>Edit</button>
        <button className={rowStyles.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
