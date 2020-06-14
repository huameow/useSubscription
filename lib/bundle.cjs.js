"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var react = require("react");

const useForceUpdate = () => react.useReducer((state) => !state, false)[1];
const createSubscription = (reducer, initialState) => {
  const subscribers = [];
  let state = initialState;
  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((callback) => callback());
  };
  const useSharedState = () => {
    const forceUpdate = useForceUpdate();
    react.useEffect(() => {
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

exports.createSubscription = createSubscription;
//# sourceMappingURL=bundle.cjs.js.map
