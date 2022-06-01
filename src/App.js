import * as React from "react";

//Custom hook used in the app component
const useSemiPersistentState = (key, initialState) => {
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
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  //UseSemiPersistentState (Custom Hook) which will keep the component's state
  //in sync with the browser's local storage.
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  //UseReducer hook, which manage multiple states
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = React.useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });

    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [searchTerm]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

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
        Search:
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ... </p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
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
