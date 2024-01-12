import React, {useState} from 'react';
import toucan from '../resources/toucan.png'; //Free image from freepik.com
import settings from '../resources/settings.png'; //Free image from freepik.com
import basket from '../resources/basket.png'; //Free image from freepik.com

function Navbar({runQuery}) {

  const [userSearch, setUserSearch] = useState('');

  const handleButtonClick = () => {
    runQuery(userSearch);
  }

  return (
    <nav className="flex bg-indigo-950 overflow-hidden">
      <img src={toucan} alt="Logo" className='float-left p-2 ml-4 w-28'/>
      <input
        type="text"
        placeholder="Search products..."
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
        className="float-left bg-indigo-400 self-center p-4 my-4 ml-12 placeholder-slate-950 h-16 w-full rounded-l-md"
      />
      <button onClick={handleButtonClick} className="float-right self-center p-4 my-4 bg-indigo-400 text-slate-950 rounded-r-md h-16 w-28">Search</button>
      <img src={basket} alt="Logo" className='float-right self-center p-2 m-2 mx-2 w-16 h-full'/>
      <img src={settings} alt="Logo" className='float-right self-center p-2 m-2 mx-2 w-14 h-full'/>
    </nav>
  );
};

export default Navbar;