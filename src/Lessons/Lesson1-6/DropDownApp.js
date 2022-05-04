import * as React from "react";

//This is an excercise from the book (Reusable component lesson)

const DropDownApp = () => {
  const [food, setFood] = React.useState("Fruit");
  const [drink, setDrink] = React.useState("Tea");

  const handleFood = (e) => {
    setFood(e.target.value);
  };

  const handleDrink = (e) => {
    setDrink(e.target.value);
  };

  return (
    <div>
      <DropDown
        label="What would you like to eat?"
        options={[
          { label: "Fruit", value: "fruit" },
          { label: "Vegetable", value: "vegetable" },
          { label: "Meat", value: "meat" },
        ]}
        value={food}
        onChange={handleFood}
      />
      <br />
      <DropDown
        label="What would you like to drink?"
        options={[
          { label: "Tea", value: "tea" },
          { label: "Coffe", value: "coffe" },
          { label: "Water", value: "water" },
        ]}
        value={drink}
        onChange={handleDrink}
      />

      <p>We eat: {food}!</p>
      <p>We drink: {drink}!</p>
    </div>
  );
};

const DropDown = ({ label, options, value, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  );
};

export default DropDownApp;
