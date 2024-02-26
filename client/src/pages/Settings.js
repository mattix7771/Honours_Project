import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '../util/util';
import Slider from '../components/Slider';
import angle_down from '../resources/angle down.png' //Free image from freepik.com

// get configurations from config file
const config = await getConfig('all');

// set up all settings
const productCategories = Array.from(config.webStore.productCategories.replace(' ', '').split(','));
const num_products = config.webStore.num_products;
const slogan_banner = config.webStore.slogan_banner;
const chatbot_show = config.webStore.chatbot_show;
const sort_show = config.webStore.sort_show;

const chatbot_name = config.Chatbot.chatbot;
const chatbot_honesty = config.Chatbot.chatbot_honesty;
const chatbot_popup = config.Chatbot.chatbot_popup;

const model_name = config.LLM.model;
const llm_max_tokens = config.LLM.llm_max_tokens;
const llm_temperature = config.LLM.llm_temperature;
const llm_top_k = config.LLM.llm_top_k;
const llm_top_p = config.LLM.llm_top_p;
const gpu_layers = config.LLM.gpu_layers;




function Settings() {

  const [productCategoriesMap, setProductCategoriesMap] = useState({
    phones: productCategories.includes('phones'),
    tvs: productCategories.includes('tvs'),
    headphones: productCategories.includes('headphones'),
    laptops: productCategories.includes('laptops'),
    watches: productCategories.includes('watches')
  });

  const [numProducts, setNumProducts] = useState(num_products);
  const [sloganBanner, setSloganBanner] = useState(slogan_banner);
  const [sortShow, setSortShow] = useState(sort_show);

  const [chatbotName, setChatbotName] = useState(chatbot_name);
  const [chatbotShow, setChatbotShow] = useState(chatbot_show);
  const [honesty, setHonesty] = useState(chatbot_honesty);
  const [chatbotPopup, setChatbotPopup] = useState(chatbot_popup);
  
  const [modelName, setModelName] = useState(model_name);
  const [llmMaxTokens, setLlmMaxTokens] = useState(llm_max_tokens);
  const [llmTemperature, setLlmTemperature] = useState(llm_temperature);
  const [llmTopK, setLlmTopK] = useState(llm_top_k);
  const [llmTopP, setLlmTopP] = useState(llm_top_p);
  const [gpuLayers, setGpuLayers] = useState(gpu_layers);




  // Checkboxes state
  // const [checkboxes, setCheckboxes] = useState({
  //   phones: true,
  //   tvs: true,
  //   headphones: true,
  //   laptops: true,
  //   watches: true
  // });
  
  // Restore checkbox state from local storage
  // useEffect(() => {
  //   const restoredCheckboxes = {};
  //   for (const key in localStorage) {
  //     if (key.startsWith('checkbox_')) {
  //       const id = key.replace('checkbox_', '');
  //       restoredCheckboxes[id] = localStorage.getItem(key) === 'true';
  //     }
  //   }
  //   setCheckboxes(restoredCheckboxes);
  // }, []);

  // Function to handle checkbox change for product categories
  const CheckboxChangeCategory = (category) => (event) => {

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
  // useEffect(() => {
  //   for (const key in checkboxes) {
  //     localStorage.setItem('checkbox_' + key, checkboxes[key]);
  //   }
  // }, [checkboxes]);


  
  // const onChange = (event) => {
  //   const { id, checked } = event.target;
  //   productCategoriesMap.set(id, checked);
  //   document.getElementById(id).checked = checked;
  // };

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
      {/* WEBSTORE SETTINGS */}

      <h2 className='m-10 font-bold text-xl'>Webstore Settings</h2>
      {Object.entries(productCategoriesMap).map(([category, value]) => {
        return(
          <div className='m-10' key={category}>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={CheckboxChangeCategory(category)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Product Category: {category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
            <br/>
          </div>

        );
      })}

      <h2 className='mx-10 my-5'>Number of products on starting page</h2>
      <div className='mx-10'>
        <input type="range" min="1" max="10" defaultValue={numProducts} class="range" id="num_products" onChange={(e) => {setNumProducts(e.target.value); saveChangeToFile('num_products', e.target.value)}}/>
        <label for="num_products">{numProducts}</label>
      </div>

      <div className='m-10'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={sloganBanner}
            onChange={() => {
              setSloganBanner(!sloganBanner);
              saveChangeToFile('slogan_banner', !sloganBanner);
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Slogan banner</span>
        </label>
        <br/>
      </div>

      <div className='m-10'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={sortShow}
            onChange={() => {
              setSortShow(!sortShow);
              saveChangeToFile('sort_show', !sortShow);
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Show Sorting Dropdown</span>
        </label>
        <br/>
      </div>


      {/* CHATBOT SETTINGS */}

      <h2 className='m-10 font-bold text-xl'>Chatbot Settings (requires page reload)</h2>

      <div className='m-10'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={chatbotShow}
            onChange={() => {
              setChatbotShow(!chatbotShow);
              saveChangeToFile('chatbot_show', !chatbotShow);
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Show Chatbot</span>
        </label>
        <br/>
      </div>

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

      <Slider
        id='chatbot_honesty'
        title='Chatbot Honesty (0 - Honest, 1 - Partially honest, 2 - Dishonest)'
        min='0'
        max='2'
        step='1'
        defaultValue={honesty}
        setVariable={setHonesty}
        saveChangeToFile={saveChangeToFile}
      />

      <div className='m-10'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={chatbotPopup}
            onChange={() => {
              setChatbotPopup(!chatbotPopup);
              saveChangeToFile('chatbot_popup', !chatbotPopup);
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Show Chatbot Popup</span>
        </label>
        <br/>
      </div>


      {/* LLM SETTINGS */}

      <h2 className='m-10 font-bold text-xl'>Language Model Settings (requires server restart)</h2>

      <h2 className='mx-10 my-5'>Model name (must be a valid model present in server/models)</h2>
      <input type='text' defaultValue={modelName} className='border-solid border-gray-400 border-2 px-5 py-2 rounded mx-10' onChange={(e) => {setModelName(e.target.value); saveChangeToFile('model', e.target.value)}}/>
      
      <Slider
        id='llm_max_tokens'
        title='Max tokens'
        min='0'
        max='200'
        step='1'
        defaultValue={llmMaxTokens}
        setVariable={setLlmMaxTokens}
        saveChangeToFile={saveChangeToFile}
      />

      <Slider
        id='llm_temperature'
        title='Temperature (0 to disable)'
        min='0'
        max='2'
        step='0.1'
        defaultValue={llmTemperature}
        setVariable={setLlmTemperature}
        saveChangeToFile={saveChangeToFile}
      />

      <Slider
        id='llm_top_k'
        title='Top K (0 to disable)'
        min='0'
        max='1'
        step='0.1'
        defaultValue={llmTopK}
        setVariable={setLlmTopK}
        saveChangeToFile={saveChangeToFile}
      />

      <Slider
        id='llm_top_p'
        title='Top P (1 to disable)'
        min='0'
        max='1'
        step='0.1'
        defaultValue={llmTopP}
        setVariable={setLlmTopP}
        saveChangeToFile={saveChangeToFile}
      />

      <Slider
        id='gpu_layers'
        title='GPU Layers'
        min='1'
        max='200'
        step='1'
        defaultValue={gpuLayers}
        setVariable={setGpuLayers}
        saveChangeToFile={saveChangeToFile}
      />




      <Link to='/'>
        <button className='bg-[#9ce6ff] m-10'>Save Changes</button>
      </Link>


    </>
  );
}

export default Settings;
