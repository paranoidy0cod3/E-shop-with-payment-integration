import { fetchError } from "../slices/productsSlice";

export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === "api/makeCall") {
      next(action);
      const { url, onStart, onSuccess, onError } = action.payload;
      dispatch({ type: onStart });
      fetch(url)
        .then((res) => res.json())
        .then((products) => dispatch({ type: onSuccess, payload: products }))
        .catch((err) => dispatch({ type: onError }));
    } else {
      next(action);
    }
  };
