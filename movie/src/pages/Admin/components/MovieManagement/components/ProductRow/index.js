import React from "react";
import rowStyles from "./ProductRow.module.scss";

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td>{product._id}</td>
      <td>{product.categories}</td>
      <td>{product.name}</td>
      <td>{product.reservation}</td>
      <td>{product.revenue}</td>
      <td>{product.seat}</td>
      <td>
        <img src={product.image} alt={product.name} className={rowStyles.img} />
      </td>
      <td>{product.createdAt}</td>
      <td>
        <button className={rowStyles.viewBtn}>View</button>
        <button className={rowStyles.editBtn}>Edit</button>
        <button className={rowStyles.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default ProductRow;
