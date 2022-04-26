import * as React from 'react';


//Custom hook used in the app component
const useStorageState = (key, initialState) => {

  //This was  the lifted state up to the closest common parent component (App), and then
  //passed down the state that comes from the input field as a prop (with the handlerSeach function)
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect( () => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};



const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://react.js.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0, 
    },{
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Adrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

 //UseStorageState (Custom Hook) which will keep the component's state
 //in sync with the browser's local storage.
 const [searchTerm, setSearchTerm] = useStorageState(
   'search',
   'React');



//Function that passes down the state to our Search component 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  //This variable filters our list (array of objects) when the user changes the state by typing 
  //information on the input field 
  const searchedStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase()));



  //------------------------Practice from the book
  const [toggle, setToggle] = React.useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  //-------------------------Practice  


  return (
    <div>
      <h1>My Hacker Stories</h1>
      {/*Passed the searchTerm as a prop in order to show the current state in 
      the Search component*/}
      <Search onSearch={handleSearch} searchTerm={searchTerm}/>

      <hr />

      
      <List list={searchedStories} />

      <hr />

      <p>This a practive about useEffect</p>

      <Toggler toggle={toggle} onToggle={handleToggle} />


      <hr/>

      <p>This is a practice with plain JavaScript from Udemy about local storage</p>

      <LocalStoragePractice/>


    </div>
  );
;}



//Used object destructuring with the props from the App component as parameters
const Search = ({searchTerm, onSearch}) => {
  
  const handleChange = (event) => {
    onSearch(event)
  };

  return (
    <>
    <label htmlFor="search">Search: </label>
    <input 
    id="search" 
    type="text"
    //this attribute lets you controlled the state of your component  
    value={searchTerm}
    onChange={handleChange}/>

    <p>
      Searching for: <strong>{searchTerm}</strong>
    </p>
    </>
  );
};


//object destructuring with the props from the app component 
const List = ({list}) => (
     <ul>
        {list.map((item) => (
          <Item key={item.objectID} item={item}/>
      ))}
    </ul>
);


//object destructuring...
const Item = ({item}) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
   </span>
   <span>{item.author}</span>
   <span>{item.num_comments}</span>
   <span>{item.points}</span>
  </li>
);


//--------------------------------------- UseEffect practice


const Toggler = ({ toggle, onToggle }) => {

  const didMount = React.useRef(false);
  console.log(didMount)
  
  React.useEffect( () => {
    console.log('I run only if toggle changes (and on mount).'); 
  }, [toggle]);

  return (
    <div>

      {/*<input type="text" value={title} onChange={handleChange} />*/}

      <button type="button" onClick={onToggle}>
        Toggle
      </button>

      {toggle && <div>Hello React</div>}
      
    </div>
  );
};

//------------------------------------------- Use Effect practice






//---------------------------------> local storage practice

const LocalStoragePractice = () => {

  
  //Local Storage (You can store basic data in the browser)
  //1)With Local storage object (method from the window object)
  //you can get different choices to work with data:
  //CLEAR, GETITEM, KEY, LENGHT, REMOVE ITEM, SETITEM.
  //2)Never take this as a single source of truth because
  //it can be easily manipulated by the users in your app
  
  //setItem, getItem this methos work along with each other
  //*The setItem method takes two parameters: first one is a key (string)
  //second argument is a value (which is also a string)
  //*The getItem method help us to get the data stored in our
  //browser by the id 

  const userId = 'u123'

  //In case you want to use an object 

  const user = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking']
  };
  

  
  const handleStorebtn = () => {
   //setItem
   localStorage.setItem('uid', userId);
   localStorage.setItem('user', JSON.stringify(user));

  };

  const handleRetrBtn = () => {
    
    const extractedId = localStorage.getItem('uid');
    const extractedUser = JSON.parse(localStorage.getItem('user'));
    console.log(extractedUser)
    if (extractedId) {
      console.log('Got the id - ' + extractedId);
    } else {
      console.log('Could not find id');
    }
    
  };

  return (
    <>
      <button id="store-btn" onClick={handleStorebtn}>STORE</button>
      <button id="retrieve-btn" onClick={handleRetrBtn}>RETRIEVE</button>
    </>

  );
}




export default App;