import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {

  // Save checkbox value to local storage and update it on change
  document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    
    // Prefix for checkboxes
    let checkboxPrefix = 'checkbox_';

    // Save checkbox value to local storage
    localStorage.setItem(checkboxPrefix + checkbox.id, checkbox.checked);

    // Listen for change event
    checkbox.addEventListener('change', function () {
      let checkboxState = localStorage.getItem(checkboxPrefix + checkbox.id);
      if (checkboxState === 'true') {
        localStorage.setItem(checkboxPrefix + checkbox.id, false);
        checkbox.checked = false;
      } else {
        localStorage.setItem(checkboxPrefix + checkbox.id, true);
        checkbox.checked = true;
      }
    });
  });
  

  return (
    <>
      <div className='m-10'>
        <label class="relative inline-flex items-center cursor-pointer">
          <input id='phones' type="checkbox" value="" class="sr-only peer" defaultChecked/>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: Phones</span>
        </label><br/>
      </div>

      <div className='m-10'>
        <label class="relative inline-flex items-center cursor-pointer">
          <input id='tvs' type="checkbox" value="" class="sr-only peer" defaultChecked/>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: Tvs</span>
        </label><br/>
      </div>

      <div className='m-10'>
        <label class="relative inline-flex items-center cursor-pointer">
          <input id='headphones' type="checkbox" value="" class="sr-only peer" defaultChecked/>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: Headphones</span>
        </label><br/>
      </div>

      <div className='m-10'>
        <label class="relative inline-flex items-center cursor-pointer">
          <input id='laptops' type="checkbox" value="" class="sr-only peer" defaultChecked/>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: Laptops</span>
        </label><br/>
      </div>

      <div className='m-10'>
        <label class="relative inline-flex items-center cursor-pointer">
          <input id='watches' type="checkbox" value="" class="sr-only peer" defaultChecked/>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: Watches</span>
        </label><br/>
      </div>

      <Link to='/'>
        <button className='bg-[#9ce6ff] m-10'>Save Changes</button>
      </Link>
      

    </>
  );
}

export default Settings;
