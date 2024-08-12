import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
// const cartLocalState = JSON.parse(localStorage.getItem("myCart"));
import { produce } from "../../../node_modules/immer";
const findIndex = (state, action) =>
  state.findIndex((item) => item.productId === action.payload.productId);

export const fetchCartData = createAsyncThunk(
  "products/fetchCart",
  async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/carts/5");
      return res.json();
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    list: [],
    error: "",
  },
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findIndex(state.list, action);

      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const existingItemIndex = findIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },

    increaseCartItem(state, action) {
      const existingItemIndex = findIndex(state.list, action);

      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItem(state, action) {
      const existingItemIndex = findIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity == 0) {
        state.list.splice(existingItemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.products;
        state.error = "";
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "something went wrong!";
      });
  },
});

const getCart = ({ products, cart }) => {
  return cart.list
    .map(({ productId, quantity }) => {
      const cartProduct = products.list.find(
        (product) => product.id === productId
      );
      return { ...cartProduct, quantity };
    })
    .filter(({ title }) => title);
};

export const selectCart = produce(getCart, (cartItems) => cartItems);
export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;

export const {
  // fetchCart,
  // fetchErrorCart,
  // updateAllCart,
  addCartItem,
  removeCartItem,
  increaseCartItem,
  decreaseCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
