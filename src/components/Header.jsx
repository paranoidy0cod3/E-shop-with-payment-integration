import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsData } from "../store/slices/productsSlice";
import {
  fetchCartData,
  selectCartError,
  selectCartLoading,
} from "../store/slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const cartItem = useSelector((state) => state.cart.list);

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartData());
  }, []);

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <Link style={{ color: "#fff" }} to={"/"}>
          <h1>MyShop</h1>
        </Link>
        <Link to={"/cart"}>
          <div style={{ fontSize: "1.3rem", padding: ".5rem 1rem" }}>
            <p>
              🛒
              {cartItem.reduce((acc, curr) => acc + curr.quantity, 0)}
            </p>
            {/* <p>state.wishList.length</p> */}
          </div>
        </Link>
      </header>
    </div>
  );
};

export default Header;
