import * as React from "react";

//Renamed the array of objects (stories) to initialStories.
//And took it out of the App function in order to manipulate the state inside

//Variable with the fake API
// const initialStories = [
//   {
//     title: "React",
//     url: "https://react.js.org/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Adrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

//Fake API which is made with a promise
// const getAsyncStories = () =>
//   new Promise((resolve) =>
//     setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
//   );

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

//Use reducer function in order to manage the state
//Global variables
const storiesReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };

    default:
      throw new Error();
  }
};

//Variable that stores the API
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=React";

const App = () => {
  //UseStorageState (Custom Hook) which will keep the component's state
  //in sync with the browser's local storage.
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  //This state manipulates the the list of stories in order to remove the titles
  //We use a promise (getAsyncStories) in order to simulate fetching the stories
  //That's is why we initiate the state with an empty array
  //Now we're having a use reducer state that manages multuple states at the
  //same time:
  //2nd:
  //This state help us with the conditional rendering... Where we show
  //the user a "loading..." feedback that I'll use on the useEffect hook
  //3rd:
  //This state we'll help us to catch an error if start getting data from
  //a remote API
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  //This use effect we called our getAsyncStories() function, which is
  //a promise that contains our list of stories.
  //We resolve our promise with the .then() method
  React.useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.stories,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, []);

  //
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "SET_STORIES",
      payload: item,
    });
  };

  //Function that passes down the state to our Search component
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //This variable filters our list (array of objects) when the user changes the state by typing
  //information on the input field
  //*The 'stories' variable read in the filter method is now setup with the initial value from
  //the stories state*
  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Early return (to show the user the loading feedback)
  //Which we use later as a conditional rendering with JSX
  // if (isLoading) {
  //   return <p>Loading ...</p>;
  // }

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

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ... </p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
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
