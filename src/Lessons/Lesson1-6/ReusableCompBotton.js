import * as React from 'react';


//Used default parameters so if the type of the button is not define it would automatically be button.

/*  This code goes in the App Component at the end of the Application I want to build 
     <p>Practice from the article (Reusable Components)</p>

      <ReusableCompBotton 
      handleClick={() => console.log('Clicked button One!')}
      >
       Click Button One!
      </ReusableCompBotton>

      <ReusableCompBotton 
      type="submit"
      handleClick={() => console.log('Clicked button Two!')}
      >
       Click Button Two!
      </ReusableCompBotton>
*/


const ReusableCompBotton = ({ type = 'button', children, handleClick }) => {
    return (
        <button type={type} onClick={handleClick}>
          {children}
        </button>
    );   
};

export default ReusableCompBotton;