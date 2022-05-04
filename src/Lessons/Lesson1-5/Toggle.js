import * as React from 'react';


// I will see if I want to put this in the App component or leave here
//and use a callback function.

//------------------------Practice from the book
/*
const [toggle, setToggle] = React.useState(true);

const handleToggle = () => {
  setToggle(!toggle);
};

*/
//-------------------------Practice 



//Return from the App component 
/*
<hr />

      <p>This a practive about useEffect</p>

      <Toggler toggle={toggle} onToggle={handleToggle} />
*/


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


export default Toggler;