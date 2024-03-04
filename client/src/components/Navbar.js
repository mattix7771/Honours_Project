import React, {useState} from 'react';
import { Link, redirect, useNavigate  } from 'react-router-dom';
import toucan from '../resources/toucan.png'; //Free image from freepik.com
import basket from '../resources/basket.png'; //Free image from freepik.com
import { logAction } from '../util/util';

/**
 * Navbar component
 * Allows products search and routes to home and basket
 * Responsible for redirecting user to different pages
 */
function Navbar({runQuery}) {

  const [userSearch, setUserSearch] = useState('');
  const navigate = useNavigate();

  // If a valid search query is supplied, redirect to CategoryProducts route with search query
  const getProducts = async (e) => {
    e.preventDefault();
    if(!userSearch) return;
    navigate(`/category_products/${userSearch}`);
  }
  
  
  {/* Navbar */}
  return (

    <nav className="flex bg-indigo-950 overflow-hidden">

      {/* Home Link */}
      <Link to='/'>
        <img src={toucan} alt="Logo" className='float-left p-2 ml-4 w-28'/>
      </Link>

      {/* Search Bar */}
      <form onSubmit={(e) => getProducts(e)} className="inline-flex float-left bg-indigo-400 self-center p-4 pr-0 my-4 ml-12 placeholder-slate-950 h-16 w-full rounded-md">
        <input
          type="text"
          placeholder="Search products..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className=" bg-indigo-400 self-center placeholder-slate-950 outline-none w-full"
        />
        <button onClick={(e) => getProducts(e)} className="ml-auto self-center p-4 my-4 bg-indigo-400 text-slate-950 rounded h-16 w-28">Search</button>
      </form>

      {/* Basket Link */}
      <Link to='/basket' className='float-right self-center p-2 m-2 mx-2 w-24 h-full'>
        <button onClick={() => logAction('Basket opened', 5)}>
          <img src={basket}/>
        </button>
      </Link>

    </nav>
  );
};

export default Navbar;