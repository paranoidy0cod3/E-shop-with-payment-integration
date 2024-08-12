import React, { useEffect, createContext } from "react";
import Product from "./components/Product";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
