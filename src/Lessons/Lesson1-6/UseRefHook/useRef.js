import * as React from "react";
/*

This part of my code goes in the app component
 <p>My use Ref without the DOM</p>
      <Counter />

*/
//UseRef hook without the DOM
const Counter = () => {
  const hasClickedButton = React.useRef(false);
  const [count, setCount] = React.useState(0);

  const onClick = () => {
    // const newCount = count + 1;

    // setCount(newCount);

    hasClickedButton.current = true;
    console.log("Has clicked button?" + " " + hasClickedButton.current);
  };
  //useRef with the state hook, the component would re-render with the state
  //updater (setCount), so the answer is yes.
  console.log("is this component being re-render?");
  //This console works when we use the useState count right now is not working
  console.log("Has clicked button?" + " " + hasClickedButton.current);

  return (
    <div>
      <p>{count}</p>

      <button type="button" onClick={onClick}>
        Increase
      </button>
    </div>
  );
};

//React Ref as intance variable

export { Counter };
