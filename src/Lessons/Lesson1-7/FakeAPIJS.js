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

//Retrieve data, this is a pseudo API request with Object.value() method (this is sync)
const getUsers = () =>
  //Async example with a promise
  Promise.resolve(Object.values(users));

//usage (1) with the method
getUsers().then((result) => {
  console.log(result);
});

//usage (2) with asycn method
const onclickHandler = () => {
  const doGetUSers = async () => {
    const result = await getUsers();
    console.log(result);
  };
  //Just calling the function... Is this a good practice?
  doGetUSers();
};

const FakeAPIJS = () => {
  return <button onClick={onclickHandler}>Fake data</button>;
};

export default FakeAPIJS;
