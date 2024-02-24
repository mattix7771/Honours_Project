import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '../util/util';
import angle_down from '../resources/angle down.png' //Free image from freepik.com

// get configurations from config file
const config = await getConfig('all');
const allProuctCategories = ['phones', 'tvs', 'headphones', 'laptops', 'watches'];

// set up all settings
const productCategories = Array.from(config.webStore.productCategories.replace(' ', '').split(','));
const num_products = config.webStore.num_products;
const chatbot_name = config.Chatbot.chatbot;



function Settings() {

  const [productCategoriesMap, setProductCategoriesMap] = useState({
    phones: productCategories.includes('phones'),
    tvs: productCategories.includes('tvs'),
    headphones: productCategories.includes('headphones'),
    laptops: productCategories.includes('laptops'),
    watches: productCategories.includes('watches')
  });

  const [chatbotName, setChatbotName] = useState(chatbot_name);




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
  const CheckboxChange = (category) => (event) => {

    const val = productCategoriesMap[category];

    const newVal = {...productCategoriesMap, [category]: !val};

    setProductCategoriesMap(newVal);

    let newCategories = '';
    for (const [key, value] of Object.entries(newVal)) {
      if (value) {
        newCategories += key + ',';
      }
    }
    newCategories = newCategories.slice(0, -1);

    saveChangeToFile('productCategories', newCategories);



    
    // const { id, checked } = event.target;
    // setCheckboxes({
    //   ...checkboxes,
    //   [id]: checked,
    // });
  };

  // Save to state to ini file when changed
  function saveChangeToFile(variable, value){
    try{
      fetch('/configWrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({variable: variable, value: value}),
      })
    } catch (error) {
      console.error(error);
    }
  }

  // Save checkbox state to local storage when it changes
  useEffect(() => {
    for (const key in checkboxes) {
      localStorage.setItem('checkbox_' + key, checkboxes[key]);
    }
  }, [checkboxes]);


  
  const onChange = (event) => {
    const { id, checked } = event.target;
    productCategoriesMap.set(id, checked);
    document.getElementById(id).checked = checked;
  };

  function toggleDropdown(){
    const dropdown = document.getElementById('chatbotDropdown');
    dropdown.classList.toggle('hidden');
  }

  function updateDropdown(botName){
    setChatbotName(botName);
    toggleDropdown();
    saveChangeToFile('chatbot', botName);
  }

  
  return (
    <>
      {/* {Object.entries(checkboxes).map(([id, isChecked]) => (
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
      ))} */}



      <h2 className='m-10 font-bold text-xl'>Webstore Settings</h2>
      {Object.entries(productCategoriesMap).map(([category, value]) => {
        return(
          <div className='m-10' key={category}>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={CheckboxChange(category)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: {category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
            <br/> 
          </div>

        );
      })}

      <h2 className='m-10 font-bold text-xl'>Chatbot Settings (requires page reload)</h2>

      <h2 className='mx-10 my-5'>Chatbot name</h2>
      <div className='relative'>
        <div className='w-64 mx-10 border-solid border-gray-400 border-2 px-5 py-2 rounded cursor-pointer font-bold hover:bg-gray-100' onClick={toggleDropdown}>{chatbotName}
          <img src={angle_down} className='h-5 w-5 float-right mt-0.5'/>
        </div>
          <div className='hidden rounded border-gray-400 bg-white absolute w-64 border-2 mx-10 shadow-md' id='chatbotDropdown'>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('toucan-bot')}>toucan-bot</div>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('toucan-bot-configured')}>toucan-bot-configured</div>
            <div className='hover:bg-gray-100 cursor-pointer p-4' onClick={() => updateDropdown('toucan-bot-llm')}>toucan-bot-llm</div>
          </div>
      </div>

      <h2 className='m-10 font-bold text-xl'>Language Model Settings (requires server restart)</h2>

      <h2 className='mx-10 my-5'>Model name (must be a valid model present in server/models)</h2>
      <input type='text' className='border-solid border-gray-400 border-2 px-5 py-2 rounded mx-10'/>
      <h2 className='mx-10 my-5'>Max tokens</h2>

      <div className='mx-10'>
        <input type="range" min="0" max="100" defaultValue="40" class="range" id="llm_max_tokens" />
        <label for="llm_max_tokens">llm_max_tokens</label>

      </div>

      


      <Link to='/'>
        <button className='bg-[#9ce6ff] m-10'>Save Changes</button>
      </Link>


    </>
  );
}

export default Settings;
