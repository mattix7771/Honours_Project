import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Settings() {

  // Checkboxes state
  const [checkboxes, setCheckboxes] = useState({
    phones: true,
    tvs: true,
    headphones: true,
    laptops: true,
    watches: true
  });
  
  // Restore checkbox state from local storage
  useEffect(() => {
    const restoredCheckboxes = {};
    for (const key in localStorage) {
      if (key.startsWith('checkbox_')) {
        const id = key.replace('checkbox_', '');
        restoredCheckboxes[id] = localStorage.getItem(key) === 'true';
      }
    }
    setCheckboxes(restoredCheckboxes);
  }, []);

  // Function to handle checkbox change
  const CheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [id]: checked,
    });
  };

  // Save checkbox state to local storage when it changes
  useEffect(() => {
    for (const key in checkboxes) {
      localStorage.setItem('checkbox_' + key, checkboxes[key]);
    }
  }, [checkboxes]);


  

  return (
    <>
      {Object.entries(checkboxes).map(([id, isChecked]) => (
        <div className='m-10' key={id}>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id={id}
              type="checkbox"
              className="sr-only peer"
              checked={isChecked}
              onChange={CheckboxChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: {id.charAt(0).toUpperCase() + id.slice(1)}</span>
          </label>
          <br/>
        </div>
      ))}
      <Link to='/'>
        <button className='bg-[#9ce6ff] m-10'>Save Changes</button>
      </Link>

    </>
  );
}

export default Settings;
