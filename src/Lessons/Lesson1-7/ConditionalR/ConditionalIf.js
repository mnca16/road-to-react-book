import React from "react";
//In this example the conditional rendering is base on props but
//it can be done by state, hook.
let users = [
  {
    id: "1",
    firstName: "Monica",
    lastName: "Delgado",
  },
  {
    id: "2",
    firstName: "Reed",
    lastName: "Smith",
  },
];

const ConditionalIf = () => {
  return (
    <div>
      <p>Hello Conditional Rendering if</p>
      <List list={users} />
    </div>
  );
};

const List = ({ list }) => {
  if (!list) {
    return null;
  }
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      {item.firstName}
      {item.lastName}
    </li>
  );
};

export default ConditionalIf;
