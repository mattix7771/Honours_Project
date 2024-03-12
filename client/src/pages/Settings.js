import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '../util/util';
import Slider from '../components/Slider';
import angle_down from '../resources/angle down.png' //Free image from freepik.com
import Switch from '../components/Switch';

// Fetch configurations from config file
const config = await getConfig('all');

// Set up all the configurations from config file
// Webchat settings
const productCategories = Array.from(config.webStore.productCategories.replace(' ', '').split(','));
const num_products = config.webStore.num_products;
const slogan_banner = config.webStore.slogan_banner;
const chatbot_show = config.webStore.chatbot_show;
const sort_show = config.webStore.sort_show;

// Chatbot settings
const chatbot_name = config.Chatbot.chatbot;
const chatbot_honesty = config.Chatbot.chatbot_honesty;
const chatbot_popup = config.Chatbot.chatbot_popup;

// LLM settings
const model_name = config.LLM.model;
const language_style = config.LLM.language_style;
const llm_max_tokens = config.LLM.llm_max_tokens;
const llm_temperature = config.LLM.llm_temperature;
const llm_top_k = config.LLM.llm_top_k;
const llm_top_p = config.LLM.llm_top_p;
const gpu_layers = config.LLM.gpu_layers;

/**
 * Settings Page
 * Hidden GUI page (accessable through the /Settings route) which allows changing the application's configurations
 * All settings changed on this page will be reflected in init_config.ini
 */
function Settings() {

  // All file configurations set up as React states
  // Webchat states
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

  // Chatbot states
  const [chatbotName, setChatbotName] = useState(chatbot_name);
  const [chatbotShow, setChatbotShow] = useState(chatbot_show);
  const [honesty, setHonesty] = useState(chatbot_honesty);
  const [chatbotPopup, setChatbotPopup] = useState(chatbot_popup);
  
  // LLM states
  const [modelName, setModelName] = useState(model_name);
  const [languageStyle, setLanguageStyle] = useState(language_style);
  const [llmMaxTokens, setLlmMaxTokens] = useState(llm_max_tokens);
  const [llmTemperature, setLlmTemperature] = useState(llm_temperature);
  const [llmTopK, setLlmTopK] = useState(llm_top_k);
  const [llmTopP, setLlmTopP] = useState(llm_top_p);
  const [gpuLayers, setGpuLayers] = useState(gpu_layers);

  
  /**
   * Handle the switch toggle
   * @param {String} category the category in productCategoriesMap to change
   * @param {Object} event the details of the triggered event
   */
  const CheckboxChangeCategory = (category) => (event) => {

    // Toggle productCategoriesMap value
    const val = productCategoriesMap[category];
    const newVal = {...productCategoriesMap, [category]: !val};
    setProductCategoriesMap(newVal);

    // Set up string and save changes to file
    let newCategories = '';
    for (const [key, value] of Object.entries(newVal)) {
      if (value) {
        newCategories += key + ',';
      }
    }
    newCategories = newCategories.slice(0, -1);

    saveChangeToFile('productCategories', newCategories);
  };

  // Save configuration changes to file
  function saveChangeToFile(variable, value){
    try{

      // API call to write any changes to configuration file
      fetch('/configWrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({variable: variable, value: value}),
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Toggle chatbots dropdown
   */
  function toggleDropdown(){
    const dropdown = document.getElementById('chatbotDropdown');
    dropdown.classList.toggle('hidden');
  }

  /**
   * Update the chatbot to be used in the application
   * @param {String} botName 
   */
  function updateDropdown(botName){
    setChatbotName(botName);
    toggleDropdown();
    saveChangeToFile('chatbot', botName);
  }

  
  return (
    <>

      {/* Webstore Settings */}
      <h2 className='m-10 font-bold text-xl'>Webstore Settings</h2>

      {/* Toggle for all product categories */}
      {Object.entries(productCategoriesMap).map(([category, value]) => {
        return(
          <Switch
            id={category}
            title={'Product Category: ' + category.charAt(0).toUpperCase() + category.slice(1)}
            variable={value}
            setVariable={CheckboxChangeCategory(category)}
            saveChangeToFile={saveChangeToFile}
          />
        );
      })}

      {/* Number of products on starting page */}
      <h2 className='mx-10 my-5'>Number of products on starting page</h2>
      <div className='mx-10'>
        <input type="range" min="1" max="10" defaultValue={numProducts} class="range" id="num_products" onChange={(e) => {setNumProducts(e.target.value); saveChangeToFile('num_products', e.target.value)}}/>
        <label for="num_products">{numProducts}</label>
      </div>

      {/* Toggle for banner on main page */}
      <Switch
        id='slogan_banner'
        title='Slogan banner'
        variable={sloganBanner}
        setVariable={setSloganBanner}
        saveChangeToFile={saveChangeToFile}
      />

      {/* Toggle for product sorting dropdown */}
      <Switch
        id='sort_show'
        title='Show Sorting Dropdown'
        variable={sortShow}
        setVariable={setSortShow}
        saveChangeToFile={saveChangeToFile}
      />


      {/* CHATBOT SETTINGS */}
      <h2 className='m-10 font-bold text-xl'>Chatbot Settings (requires page reload)</h2>

      {/* Toggle for chatbot */}
      <Switch
        id='chatbot_show'
        title='Show Chatbot'
        variable={chatbotShow}
        setVariable={setChatbotShow}
        saveChangeToFile={saveChangeToFile}
      />

      {/* Dropdown for which chatbot to use */}
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

      {/* Slider for chatbot honesty */}
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

      {/* Toogle for chatbot popup */}
      <Switch
        id='chatbot_popup'
        title='Show Chatbot Popup'
        variable={chatbotPopup}
        setVariable={setChatbotPopup}
        saveChangeToFile={saveChangeToFile}
      />


      {/* LLM SETTINGS */}
      <h2 className='m-10 font-bold text-xl'>Language Model Settings (requires server restart)</h2>

      {/* Textbox for model to be used for language processing (must be a valid model present in server/models)*/}
      <h2 className='mx-10 my-5'>Model name (must be a valid model present in server/models)</h2>
      <input type='text' defaultValue={modelName} className='border-solid border-gray-400 border-2 px-5 py-2 rounded mx-10' onChange={(e) => {setModelName(e.target.value); saveChangeToFile('model', e.target.value)}}/>
      
      {/* Slider for language style */}
      <Slider
        id='language_style'
        title='Language Style (0 - Formal, 1 - Informal)'
        min='0'
        max='1'
        step='1'
        defaultValue={languageStyle}
        setVariable={setLanguageStyle}
        saveChangeToFile={saveChangeToFile}
      />

      {/* Slider for maximum number of tokens that LLM should output */}
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

      {/* Slider for LLM temperature (0 to disable) */}
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

      {/* Slider for LLM TopK (0 to disable) */}
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

      {/* Slider for LLM TopP (1 to disable) */}
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

      {/* Slider for number of GPU layers to dedicate to LLM */}
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

      {/* Link to Main page */}
      <Link to='/'>
        <button className='bg-[#9ce6ff] m-10'>Save Changes</button>
      </Link>

    </>
  );
}

export default Settings;
