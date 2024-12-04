import React from "react";
import rowStyles from "./UserRow.module.scss";

const UserRow = ({ product }) => {
  return (
    <tr>
      <td>{product.user_id}</td>
      <td>{product.user_name}</td>
      <td>{product.email}</td>
      <td>{product.created_at}</td>
      <td>{product.updated_at}</td>
      <td>
        <button className={rowStyles.viewBtn}>View</button>
        <button className={rowStyles.editBtn}>Edit</button>
        <button className={rowStyles.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
