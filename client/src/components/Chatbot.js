import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { logAction, getConfig } from '../util/util';

// get chatbot configuration from config file
const config = await getConfig('Chatbot');
const chatbot_name = config.chatbot;
const chatbot_honesty = config.chatbot_honesty;
const chatbot_popup = config.chatbot_popup;

// Use localstorage to only load bot and starting message once
localStorage.setItem('chatbotLoaded', false);
localStorage.setItem('triggerSent', false);

// Reset chatbot honesty
try{

  // API call to write any changes to configuration file
  fetch('/configWrite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({variable: 'chatbot_honesty', value: -2}),
  });
} catch (error) {
  console.error(error);
}

/** 
 * Chatbot component
 * Responsible for chatbot initialisation and event handling
 */
const Chatbot = () => {

  const [chatbotLoaded, setChatbotLoaded] = useState(localStorage.getItem('chatbotLoaded') === 'true' ? true : false);
  const navigate = useNavigate();
  const logTimeout = 1000;
  let prevLogTime = 0;

  // Chatbot initialisation
  useEffect(() => {
    
    if(!chatbotLoaded){
      const script = document.createElement('script');
      script.src = "http://localhost:3001/assets/modules/channel-web/customInject.js";
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        window.botpressWebChat.init({
          host: "http://localhost:3001",
          botId: chatbot_name,
          extraStylesheet: '/assets/modules/channel-web/custom.css'
        });
      }
      setChatbotLoaded(true);
      localStorage.setItem('chatbotLoaded', true);
    }
  }, [chatbotLoaded]);

  function checkLogAction(action, code) {
    const currentTime = Date.now();
    if (currentTime - prevLogTime > logTimeout) {
      logAction(action, code);
      prevLogTime = currentTime;
    }
  }

  // Once chatbot loaded, listen for chat events and log them
  useEffect(() => {
    if(chatbotLoaded){
      window.addEventListener("message", function(event) {
        if (event.data.name === "webchatOpened") {
          checkLogAction("Chatbot opened", 10);
        } else if (event.data.name === "webchatClosed") {
          checkLogAction("Chatbot closed", 11);
        } else if (event.data.name === "webchatReady") {
          if (localStorage.getItem('triggerSent') === 'false') {
            window.botpressWebChat.sendEvent({
              type: 'proactive-trigger',
              channel: 'web'
            });
            localStorage.setItem('triggerSent', true);
          }
        } else if(event.type === "message" && event.data.data && event.data.type == "data"){
          const data = event.data.data.split(',');
          navigate(`/category_products/${JSON.stringify(data)}`);
        } else if (event.type === "message" && event.data.payload && event.data.payload.text) {
          if(event.data.payload.typing)
            checkLogAction(`Chatbot sent message: ${event.data.payload.text}`, 13);
          else
            checkLogAction(`User sent message: ${event.data.payload.text}`, 12);
        }
      })
    }
  }, [chatbotLoaded]);


  return (
    <>   
      {/* Webchat */}
      <div id="webchat" />

      {/* Popup */}
      {chatbot_popup && <div className="fixed bottom-10 right-24 flex items-center">
        <div className="bg-gray-100 shadow-lg text-gray-800 ml-4 px-4 py-2 rounded">
          Hey there! Need help? <br/>Click here to chat with us!
        </div>
      </div>}
    </>
  )
}

export default Chatbot