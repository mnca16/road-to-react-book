import React from "react";

//The methods setTimeout(), and getCurrentPosition() don't have promise version
//in this excersice we'll wrap them into promise support code, this is going
//to help us to understand how a promise works internally

//Promise => Takes a function as an argument, which takes the promise API
//that will execute right away when is constructed (new Promise()).
//That function takes two arguments, and each argument itself is a
//function (resolve function, reject function)

//Geolocation method
//Geolocation.getCurrentPosition() the first two parameteres are callbacks
//and the third one is an object.
//Syntax getCurrentPosition(success, error, options)

const PromisesPractice = () => {
  //This function gets the user position, creates a new promise with two
  //parameters but it just used one
  const getPosition = (opts) => {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          resolve(success);
        },
        (error) => {
          reject(error);
        },
        opts
      );
    });
    return promise;
  };

  //This function get us the duration
  const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Done!");
      }, duration);
    });
    return promise;
  };

  //Final function, this function combine the two previous functions,
  //mocking asycn data, using the .then method
  const trackUserHandler = () => {
    let positionData;
    getPosition()
      .then((posData) => {
        positionData = posData;
        return setTimer(2000);
      })
      .catch((err) => {
        console.log(err);
        return "on we go...";
      })
      .then((data) => {
        console.log(data, positionData);
      });

    setTimer(1000).then(() => {
      console.log("Timer done!");
    });
    console.log("Getting position...");
  };

  return <button onClick={trackUserHandler}> Click </button>;
};

export default PromisesPractice;
