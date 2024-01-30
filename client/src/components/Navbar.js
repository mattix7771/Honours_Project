import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import toucan from '../resources/toucan.png'; //Free image from freepik.com
import settings from '../resources/settings.png'; //Free image from freepik.com
import basket from '../resources/basket.png'; //Free image from freepik.com

/**
 * Navbar component
 *
 * @param {runQuery} returns query parameters to Home.js to update products according to parameters
 */
function Navbar({runQuery}) {

  const [userSearch, setUserSearch] = useState('');

  // Send quert to Home.js
  const handleButtonClick = (event) => {
    event.preventDefault();
    runQuery(userSearch);
  }

  // Log action
  const logAction = async (message) => {
    try {
      const response = await fetch('/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log: message }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Log successfully sent.');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  return (
    <nav className="flex bg-indigo-950 overflow-hidden">
      <Link to='/' onClick={() => logAction('Clicked home')}>
        <img src={toucan} alt="Logo" className='float-left p-2 ml-4 w-28'/>
      </Link>

      <form onSubmit={handleButtonClick} className="inline-flex float-left bg-indigo-400 self-center p-4 pr-0 my-4 ml-12 placeholder-slate-950 h-16 w-full rounded-md">
        <input
          type="text"
          placeholder="Search products..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className=" bg-indigo-400 self-center placeholder-slate-950 outline-none w-full"
        />
        <button onClick={handleButtonClick} className="ml-auto self-center p-4 my-4 bg-indigo-400 text-slate-950 rounded h-16 w-28">Search</button>
      </form>

      <Link to='/basket' className='float-right self-center p-2 m-2 mx-2 w-24 h-full'>
        <button onClick={() => logAction('Basket opened')}>
          <img src={basket}/>
        </button>
      </Link>
      <Link to='/settings' className='float-right self-center p-2 m-2 mx-2 w-20 h-full'>
        <button>
          <img src={settings}/>
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;