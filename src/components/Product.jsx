import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/slices/cartSlice";

const Product = ({ id, title, image, price }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ width: "250px", border: "1px solid white", padding: "1rem" }}>
      <img style={{ width: "250px", height: "150px" }} src={image} alt="" />
      <h3>{title}</h3>
      <p>$ {price}</p>
      <div>
        <button
          onClick={() => dispatch(addCartItem({ productId: id }))}
          style={{ margin: ".5rem", padding: "5px 10px" }}
        >
          add to Cart
        </button>
        <button style={{ margin: ".5rem", padding: "5px 10px" }}>
          add to wishlist
        </button>
      </div>
    </div>
  );
};

export default Product;
