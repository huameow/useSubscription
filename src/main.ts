import { useEffect, useReducer, Dispatch, Reducer } from "react";

const useForceUpdate = () => useReducer((state) => !state, false)[1];

type Callback = () => unknown;

export const createSubscriptionHook = <T, A>(
  reducer: Reducer<T, A>,
  initialState: T
): (() => [T, Dispatch<A>]) => {
  const subscribers: Callback[] = [];
  let state: T = initialState;
  const dispatch: Dispatch<A> = (action: A) => {
    state = reducer(state, action);
    subscribers.forEach((callback) => callback());
    return new Promise((resolve) => {
      console.log("dispatch", state);
      resolve(state);
    });
  };
  const useSharedState = (): [T, Dispatch<A>] => {
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
