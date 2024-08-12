import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../store/slices/productsSlice";

const Home = () => {
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>loading...</h1>
  ) : error ? (
    <h1 style={{ textAlign: "center" }}>{error} something went wrong</h1>
  ) : (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "space-between",
      }}
    >
      {products.map(({ id, title, image, price }) => {
        return (
          <Product key={id} id={id} title={title} image={image} price={price} />
        );
      })}
    </div>
  );
};

export default Home;
