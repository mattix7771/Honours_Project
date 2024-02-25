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
  const [modelName, setModelName] = useState(model_name);
  const [chatbotName, setChatbotName] = useState(chatbot_name);
  const [llmMaxTokens, setLlmMaxTokens] = useState(llm_max_tokens);
  const [llmTemperature, setLlmTemperature] = useState(llm_temperature);
  const [llmTopK, setLlmTopK] = useState(llm_top_k);
  const [llmTopP, setLlmTopP] = useState(llm_top_p);
  const [gpuLayers, setGpuLayers] = useState(gpu_layers);




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

      <h2 className='mx-10 my-5'>Number of products on starting page</h2>
      <div className='mx-10'>
        <input type="range" min="1" max="10" defaultValue={numProducts} class="range" id="num_products" onChange={(e) => {setNumProducts(e.target.value); saveChangeToFile('num_products', e.target.value)}}/>
        <label for="num_products">{numProducts}</label>
      </div>

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
      <input type='text' className='border-solid border-gray-400 border-2 px-5 py-2 rounded mx-10' onChange={(e) => {setModelName(e.target.value); saveChangeToFile('model', e.target.value)}}/>
      
      <h2 className='mx-10 my-5'>Max tokens</h2>
      <div className='mx-10'>
        <input type="range" min="0" max="200" defaultValue={llmMaxTokens} class="range" id="llm_max_tokens" onChange={(e) => {setLlmMaxTokens(e.target.value); saveChangeToFile('llm_max_tokens', e.target.value)}}/>
        <label for="llm_max_tokens">{llmMaxTokens}</label>
      </div>

      <h2 className='mx-10 my-5'>Temperature (0 to disable)</h2>
      <div className='mx-10'>
        <input type="range" min="0" max="2" step="0.1" defaultValue={llmTemperature} class="range" id="llm_temperature" onChange={(e) => {setLlmTemperature(e.target.value); saveChangeToFile('llm_temperature', e.target.value)}}/>
        <label for="llm_temperature">{llmTemperature}</label>
      </div>

      <h2 className='mx-10 my-5'>Top K (0 to disable)</h2>
      <div className='mx-10'>
        <input type="range" min="0" max="1" step="0.1" defaultValue={llmTopK} class="range" id="llm_top_k" onChange={(e) => {setLlmTopK(e.target.value); saveChangeToFile('llm_top_k', e.target.value)}}/>
        <label for="llm_top_k">{llmTopK}</label>
      </div>

      <h2 className='mx-10 my-5'>Top P (1 to disable)</h2>
      <div className='mx-10'>
        <input type="range" min="0" max="1" step="0.1" defaultValue={llmTopP} class="range" id="llm_top_p" onChange={(e) => {setLlmTopP(e.target.value); saveChangeToFile('llm_top_p', e.target.value)}}/>
        <label for="llm_top_p">{llmTopP}</label>
      </div>

      <h2 className='mx-10 my-5'>GPU Layers</h2>
      <div className='mx-10'>
        <input type="range" min="1" max="200" defaultValue={gpuLayers} class="range" id="gpu_layers" onChange={(e) => {setGpuLayers(e.target.value); saveChangeToFile('gpu_layers', e.target.value)}}/>
        <label for="gpu_layers">{gpuLayers}</label>
      </div>



      <Link to='/'>
        <button className='bg-[#9ce6ff] m-10'>Save Changes</button>
      </Link>


    </>
  );
}

export default Settings;
