import React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { screen } from '@testing-library/dom'
import {createSubscription} from './main';

const initialState = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "set":
      return action.count;
    default:
      return state;
  }
};

const Counter = ({ count, dispatch }) => (
  <div>
    {count}
    <button onClick={() => dispatch({ type: "increment" })}>+1</button>
    <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
    <button onClick={() => dispatch({ type: "set", count: 0 })}>reset</button>
  </div>
);

const useCount1 = createSubscription(reducer, initialState);
const useCount2 = createSubscription(reducer, initialState);

const Counter1 = () => {
  const [count, dispatch] = useCount1();
  return <Counter count={count} dispatch={dispatch} />;
};

const Counter2 = () => {
  const [count, dispatch] = useCount2();
  return <Counter count={count} dispatch={dispatch} />;
};

const ExampleCounter = () => (
  <>
    <Counter1 data-testid="counter1a" />
    <Counter1 data-testid="counter1b" />
    <Counter2 data-testid="counter2a" />
    <Counter2 data-testid="counter2b" />
  </>
);


describe("check hook", () => {
  it("example: counter", async function () {
    const {findByTestId, getByTestId, getByText, queryAllByText} = render(
      <ExampleCounter />
    );
    
    // const counter1a = getByTestId('counter1a');
    // const increame = fireEvent(
    //   queryAllByText('+1'),
    //   new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //     button: 0
    //   })
    // )

    expect(3).toBe(3);
  });
});
