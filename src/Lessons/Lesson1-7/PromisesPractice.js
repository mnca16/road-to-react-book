import React from "react";

//The methods setTimeout(), and getCurrentPosition() don't have promise version
//in this excersice we'll wrap them into promise support code, this is going
//to help us to understand how a promise works internally

//Promise => Takes a function as an argument, which takes the promise API
//that will execute right away when is constructed (new Promise()).
//That function takes two arguments, and each argument itself is a
//function (resolve function, reject function)

const PromisesPractice = () => {
  const getPosition = (opts) => {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          resolve(success);
        },
        (error) => {},
        opts
      );
    });
    return promise;
  };

  const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Done!");
      }, duration);
    });
    return promise;
  };

  const trackUserHandler = () => {
    getPosition().then((posData) => {
      console.log(posData);
    });
    setTimer(1000).then(() => {
      console.log("Timer done!");
    });
    console.log("Getting position...");
  };

  return <button onClick={trackUserHandler}> Click </button>;
};

export default PromisesPractice;
