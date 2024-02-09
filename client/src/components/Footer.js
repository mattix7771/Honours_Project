import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import toucan from '../resources/toucan.png'; //Free image from freepik.com
import settings from '../resources/settings.png'; //Free image from freepik.com
import basket from '../resources/basket.png'; //Free image from freepik.com


function Footer() {

  return (
		<>
		<footer className="bg-indigo-950 h-20">
			<span className='text-white'>Banner image supplied by Freepik.com</span>
		</footer>
		</>
  );
};

export default Footer;