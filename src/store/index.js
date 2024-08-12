//can import middlewares
import cartReducer from "./slices/cartSlice.js";
import productsReducer from "./slices/productsSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { products: productsReducer, cart: cartReducer },
  // middleware: (defaultMiddleware) => [
  //   ...defaultMiddleware(),
  //   apiMiddleware,
  //   func,
  //   logger,
  // ],
});
