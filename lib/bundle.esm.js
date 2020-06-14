import { useState, useReducer, useEffect } from "react";

const useForceUpdate = () => useReducer((state) => !state, false)[1];
const useSubscription = (reducer, initialState) => {
  const subscribers = [];
  let state = initialState;
  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((callback) => callback());
  };
  const useSharedState = () => {
    const forceUpdate = useForceUpdate();
    useEffect(() => {
      const callback = () => forceUpdate();
      subscribers.push(callback);
      callback();
      const cleanup = () => {
        const index = subscribers.indexOf(callback);
        subscribers.splice(index, 1);
      };
      return cleanup;
    }, []);
    return [state, dispatch];
  };
  return useSharedState;
};
const useTest = () => {
  const [state, setState] = useState(0);
  return [state, setState];
};

export { useSubscription, useTest };
//# sourceMappingURL=bundle.esm.js.map
