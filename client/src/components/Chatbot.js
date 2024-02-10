import React, { useEffect, useState } from 'react'
import { logAction } from '../util/util';
import e from 'express';

// Initialise botpress webchat



/** 
 * Chatbot component
 * Responsible for chatbot initialisation and event handling
 */ 
const Chatbot = () => {

  const [chatbotLoaded, setChatbotLoaded] = useState(false);

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
          botId: "toucan-bot"
        });
      }
      setChatbotLoaded(true);
    }
  }, [chatbotLoaded]);


  useEffect(() => {
    if(chatbotLoaded){
      console.log('Chatbot loaded');
      window.addEventListener("message", function(event) {
        console.log(event.data.name);
        if (event.data.name === "webchatOpened") {
          logAction("Chatbot opened", 10);
        } else if (event.data.name === "webchatClosed") {
          logAction("Chatbot closed", 11);
        } else if (event.data.name === "webchatMessageSent" || event.data.name === "userMessage" || event.data.name === "userPayload") {
          console.log('User message:', event.data.text);
        }
      })
    }
  }, [chatbotLoaded]);




  return (
    <>
      <div id="webchat" />
    </>
  )
}
 
export default Chatbot