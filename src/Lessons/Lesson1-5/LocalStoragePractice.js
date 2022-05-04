import * as React from 'react';





//Return from the App component

/*

<hr/>

<p>This is a practice with plain JavaScript from Udemy about local storage</p>

<LocalStoragePractice/>

*/

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

export default LocalStoragePractice;