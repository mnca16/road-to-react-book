import React from "react";
//User reducer is an alternaive for useState
//In useReducer, dispatch is also a function and that function receive
//two parameter that changes the state. (state, action)

const INCREMENT = "increment";
const DECREMENT = "decrement";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + action.incrementBy;
    case DECREMENT:
      return state - 1;
  }
};

const CounterUseReducer = () => {
  //const [count, setCount] = React.useState(0);

  const [countByReducer, dispatch] = React.useReducer(reducer, 0);

  return (
    <div>
      <p>{countByReducer}</p>
      <button onClick={() => dispatch({ type: INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>-</button>
    </div>
  );
};

export default CounterUseReducer;
