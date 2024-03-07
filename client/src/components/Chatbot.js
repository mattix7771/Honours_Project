import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { logAction, getConfig } from '../util/util';

// get chatbot configuration from config file
const config = await getConfig('Chatbot');
const chatbot_name = config.chatbot;
const chatbot_popup = config.chatbot_popup;

/** 
 * Chatbot component
 * Responsible for chatbot initialisation and event handling
 */
const Chatbot = () => {

  const [chatbotLoaded, setChatbotLoaded] = useState(false);
  const navigate = useNavigate();

  // Chatbot initialisation
  useEffect(() => {
    
    const existingChatbotButton = document.querySelector('.bpw-widget-btn');
    
    if(!existingChatbotButton && !chatbotLoaded){
      const script = document.createElement('script');
      script.src = "http://localhost:3001/assets/modules/channel-web/inject.js";
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
    }
  }, [chatbotLoaded]);

  // Once chatbot loaded, listen for chat events and log them
  useEffect(() => {
    if(chatbotLoaded){
      window.addEventListener("message", function(event) {
        if (event.data.name === "webchatOpened") {
          logAction("Chatbot opened", 10);
        } else if (event.data.name === "webchatClosed") {
          logAction("Chatbot closed", 11);
        } else if (event.data.name === "webchatReady") {
          window.botpressWebChat.sendEvent({
            type: 'proactive-trigger',
            channel: 'web'
          });
        } else if(event.type === "message" && event.data.data && event.data.type == "data"){
          const data = event.data.data.split(',');
          navigate(`/category_products/${JSON.stringify(data)}`);
        } else if (event.type === "message" && event.data.payload && event.data.payload.text) {
          if(event.data.payload.typing)
            logAction(`Chatbot sent message: ${event.data.payload.text}`, 13);
          else
            logAction(`User sent message: ${event.data.payload.text}`, 12);
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