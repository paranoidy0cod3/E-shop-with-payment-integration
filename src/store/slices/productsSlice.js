import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      return res.json();
    } catch (error) {
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    list: [],
    error: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = "";
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "something went Wrong!";
      });
  },
});

export const selectProducts = (state) => state.products.list;
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
//  export const { updateAllProducts, fetchProducts, fetchError } =
// productsSlice.actions;
export default productsSlice.reducer;
