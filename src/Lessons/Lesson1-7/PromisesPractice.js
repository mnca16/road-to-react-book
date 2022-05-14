import React from "react";

const PromisesPractice = () => {
  const trackUserHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (posData) => {
        setTimeout(() => {
          console.log(posData);
        }, 2000);
      },
      (error) => {
        console.log(error);
      }
    );
    setTimeout(() => {
      console.log("Timer done!");
    }, 0);
    console.log("Getting position...");
  };

  return <button onClick={trackUserHandler}> Click </button>;
};

export default PromisesPractice;
