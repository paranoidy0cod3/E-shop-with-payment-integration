export function createStore(reducer) {
  const listeners = [];
  let state;
  const store = {
    getState() {
      return state;
    },

    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => {
        listener();
      });
    },

    subscribe(listener) {
      listeners.push(listener);
      return function () {
        const listenerIndex = listeners.findIndex(
          (regListener) => regListener === listener
        );

        listeners.splice(listenerIndex, 1);
      };
    },
  };

  store.dispatch({ type: "@@INIT" });
  return store;
}

export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function (state = {}, action) {
    const nextState = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key]; // 1st call productsReducer
      const prevStateForKey = state[key];
      const nextStateForKey = reducer(prevStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}
