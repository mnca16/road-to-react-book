import * as React from 'react';

function getTittle (title) {
  return title;
}

const location = 'is here';

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

function App() {
  return (
    <div>
      <h1>Hello {getTittle('React')} {location}</h1>
      <h2>{welcome.greeting} {welcome.title}</h2>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"/>
    </div>
    );   
}

export default App;
