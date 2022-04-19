import * as React from 'react';



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
  //moved (lifted) the state up to the closest common parent component (App), and then
  //passed down the state that comes from the input field as a prop (with the handlerSeach function)
  const [searchTerm, setSearchTerm] = React.useState('');

//Function that passes down the state to our Search component 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  //This variable filters our list (array of objects) when the user changes the state by typing 
  //information on the input field 
  const searchedStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div>
      <h1>My Hacker Stories</h1>
      {/*Passed the searchTerm as a prop in order to show the current state in 
      the Search component*/}
      <Search onSearch={handleSearch} searchTerm={searchTerm}/>

      <hr />

      
      <List list={searchedStories} />

    </div>
  );
;}


//Used object destructuring with the props from the App component as parameters
const Search = ({searchTerm, onSearch}) => {
  
  const handleChange = (event) => {
    onSearch(event)
  };

  return (
    <div>
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
    </div>
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

export default App;
