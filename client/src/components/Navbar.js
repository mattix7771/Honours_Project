import React from 'react';
import toucan from '../resources/toucan.png'; //Free image from freepik.com
import settings from '../resources/settings.png'; //Free image from freepik.com
import basket from '../resources/basket.png'; //Free image from freepik.com

const Navbar = () => {
  return (
    <nav className="flex bg-indigo-950 overflow-hidden">
      <img src={toucan} alt="Logo" className='float-left align-middle p-2 m-2 w-36'/>
      <input
        type="text"
        placeholder="Search item"
        className="float-left bg-indigo-400 self-center p-4 m-4 mx-12 placeholder-slate-950 h-16 w-full rounded-lg"
      />
      <img src={settings} alt="Logo" className='float-right self-center p-2 m-2 mx-4 w-[5%] h-full'/>
      <img src={basket} alt="Logo" className='float-right self-center p-2 m-2 mx-4 w-[5%] h-full'/>
    </nav>
  );
};

export default Navbar;