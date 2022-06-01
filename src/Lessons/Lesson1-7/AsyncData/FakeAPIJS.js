import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React from "react";
import { v4 as uuidv4 } from "uuid";

//JavaScript practice
//In this excercise I will fake an API with Mock Data
//this helps when there is not backend yet
//I will use a new library *This is so exciting*
//the library is call uuid and it stands for (universal unique identifier UUID)
//after creating the fake data base will use the "CRUD" pattern (Create, read, update, delete)
//this are four basic operations for persintent storage

const idOne = uuidv4();
const idTwo = uuidv4();

let users = {
  [idOne]: {
    id: "idOne",
    firstName: "Monica",
    lastName: "Delgado",
    isDeveloper: true,
  },
  [idTwo]: {
    id: "idTwo",
    firstName: "Reed",
    lastName: "Smith",
    isDeveloper: false,
  },
};

const FakeAPIJS = () => {
  //Retrieve data, this is a pseudo API request with Object.value() method (this is sync)
  const getUsers = () =>
    //Async example with a promise, the longer promise version enable us to handle errors
    new Promise((resolve, reject) => {
      if (!users) {
        return setTimeout(() => reject(new Error("Users not found")), 250);
      }
      resolve(Object.values(users));
    });

  //usage (1) with the method
  getUsers()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  //usage (2) with asycn method
  const onclickHandler = () => {
    const doGetUSers = async () => {
      try {
        const result = await getUsers();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    //Just calling the function... Is this a good practice?
    return doGetUSers;
  };
  return (
    <>
      <button onClick={onclickHandler}>Fake data</button>
      {onclickHandler}
      <></>
    </>
  );
};

export default FakeAPIJS;
