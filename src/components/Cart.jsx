import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
  selectCart,
  selectCartLoading,
  selectCartError,
} from "../store/slices/cartSlice.js";
import ProceedCheckout from "./ProceedCheckout.jsx";

const Cart = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const cartItems = useSelector(selectCart);

  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div className="cart-wrapper">
      <table
        style={{
          width: "100%",
          placeItems: "center",
          flex: "0 0 60%",
          marginInline: "auto",
        }}
      >
        <thead>
          <tr>
            <td>ITEM</td>
            <td>PRICE</td>
            <td>QUANTITY</td>
            <td>TOTAL</td>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={product.image}
                  alt=""
                />{" "}
                {product.title}
                <button
                  onClick={() =>
                    dispatch(removeCartItem({ productId: product.productId }))
                  }
                  style={{
                    margin: "0 10px",
                    backgroundColor: "red",
                    borderRadius: "8px",
                  }}
                >
                  Remove Item
                </button>
              </td>
              <td>$ {product.price}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch(decreaseCartItem({ productId: product.id }))
                  }
                >
                  -
                </button>{" "}
                {product.quantity}{" "}
                <button
                  onClick={() =>
                    dispatch(increaseCartItem({ productId: product.id }))
                  }
                >
                  +
                </button>
              </td>
              <td>$ {(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>TOTAL</td>
            <td>
              {Math.round(
                cartItems.reduce((acc, curr) => {
                  return (acc += curr.price * curr.quantity);
                }, 0) * 100
              ) / 100}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="proceed-checkout">
        <ProceedCheckout cartItems={cartItems} />{" "}
      </div>
    </div>
  );
};

export default Cart;
