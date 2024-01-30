import React, { useEffect, useState } from 'react'

// Initialise botpress webchat
const Chatbot = () => {

  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  // Log action
  const logAction = async (message) => {
    try {
      const response = await fetch('/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log: message }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Log successfully sent.');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
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
  }, []);


  useEffect(() => {
    if(chatbotLoaded){
      console.log('Chatbot loaded');
      window.addEventListener("message", function(event) {
        console.log(event.data.name);
        if (event.data.name === "webchatOpened") {
          logAction("Chatbot opened");
        } else if (event.data.name === "webchatClosed") {
          logAction("Chatbot closed");
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