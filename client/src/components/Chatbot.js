import React, { useEffect, useState } from 'react'

// Initialise botpress webchat
const Chatbot = () => {

  const [chatbotLoaded, setChatbotLoaded] = useState(false);

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

  // useEffect(() => {
  //   if(chatbotLoaded && !payloadSent){
  //     console.log('Chatbot loaded');
  //     window.addEventListener("message", function(event) {
  //       if (event.data.name === "webchatOpened") {
  //         console.log('webchatOpened');
  //         window.botpressWebChat.sendEvent({
  //           type: 'proactive-trigger',
  //           channel: 'web',
  //           payload: {
  //             product: cheapestPhone
  //           }
  //         })
  //       }
  //     })
  //     setPayloadSent(true);
  //   }
  // }, []);




  return (
    <>
      <div id="webchat" />
    </>
  )
}
 
export default Chatbot