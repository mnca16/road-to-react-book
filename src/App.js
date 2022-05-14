import * as React from "react";
import PromisesPractice from "./Lessons/Lesson1-7/PromisesPractice";
import ReusableCompBotton from "./Lessons/Lesson1-6/ReusableCompBotton";
import DropDownApp from "./Lessons/Lesson1-6/DropDownApp";
import { Counter } from "./Lessons/Lesson1-6/UseRefHook/useRef";

//Renamed the array of objects (stories) to initialStories.
//And took it out of the App function in order to manipulate the state inside
const initialStories = [
  {
    title: "React",
    url: "https://react.js.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Adrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

//Custom hook used in the app component
const useStorageState = (key, initialState) => {
  //This was  the lifted state up to the closest common parent component (App), and then
  //passed down the state that comes from the input field as a prop (with the handlerSeach function)
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  //UseStorageState (Custom Hook) which will keep the component's state
  //in sync with the browser's local storage.
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  //This state manipulates the the list of stories in order to remove the titles
  const [stories, setStories] = React.useState(initialStories);
  console.log(`stories state: ${stories}`);

  //
  const handleRemoveStory = (item) => {
    console.log(`These are the arguments from the handleRemoveStory ${item}`);
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  //Function that passes down the state to our Search component
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  //This variable filters our list (array of objects) when the user changes the state by typing
  //information on the input field
  //*The 'stories' variable read in the filter method is now setup with the initial value from
  //the stories state*
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      {/*Passed the searchTerm as a prop in order to show the current state in 
      the Search component*/}
      <InputWithLabel
        id="search"
        //label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        Search: whats going on?
      </InputWithLabel>

      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />

      <hr />
      {/*Promises Practice*/}

      <PromisesPractice></PromisesPractice>
    </div>
  );
};

const InputWithLabel = ({
  id,
  children,
  value,
  onInputChange,
  isFocused,
  type = "text",
}) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        //The id is pass down as prop from the app component, which is part
        //of the parameters (key) from the custom component
        id={id}
        type={type}
        //this attribute lets you controlled the state of your component
        //also is the initial state from the Search state
        value={value}
        autoFocus={isFocused}
        //Gets the value from the user with the handler function in the App component
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  //This is another way to remove an item without the inline handler
  //This is a normal handlers
  // const handleRemoveItem = () => {
  //   onRemoveItem(item);
  // };
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default App;
