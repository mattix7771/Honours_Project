// import React, {useState} from 'react';
// import '../App.css';

// function Chatbot() {

//     // Get response from language model
//     const [userPrompt, setUserPrompt] = useState('');
//     const [reply, setReply] = useState('');
  
//     const handleSubmit = async () => {
//       setReply('');
//       try {
//         const response = await fetch('/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ prompt: userPrompt }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
  
//         const data = await response.json();
//         setReply(data.reply);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };


//   return (
//     <div className="">
//       <input
//         type="text"
//         value={userPrompt}
//         onChange={(e) => setUserPrompt(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//       />
//       <button
//         onClick={handleSubmit}
//         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
//       >
//         Submit
//       </button>
//       <div className="mt-4">
//         <p className="text-gray-600">User: {userPrompt}</p>
//         <p className="text-gray-800">AI: {reply}</p>
//       </div>
//       <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
//       <script src="https://mediafiles.botpress.cloud/852dcb24-51ce-44f1-b542-5a747a7b9155/webchat/config.js" defer></script>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useEffect, useState } from 'react'

  // Initialise botpress webchat
  const Chatbot = () => {

  const [cheapestPhone, setCheapestPhone] = useState('');
  const [firstEffectDone, setFirstEffectDone] = useState(false);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  const [productType, setProductType] = useState('');
  const [productFilter, setProductFilter] = useState('');

  useEffect(() => {
    fetch('/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCheapestPhone(data[0]);
        console.log(data); // Log the data after setting the state
      })
      .then(() => setFirstEffectDone(true))
      .catch((error) => console.error('Fetch error:', error));
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    console.log(cheapestPhone);
  }, [cheapestPhone]); // Log cheapestPhone whenever it changes


  useEffect(() => {
    if(firstEffectDone){
      const script = document.createElement('script')
      script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
      script.async = true
      document.body.appendChild(script)
   
      script.onload = () => {
        window.botpressWebChat.init({
          botId: '852dcb24-51ce-44f1-b542-5a747a7b9155',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: '852dcb24-51ce-44f1-b542-5a747a7b9155',
          botName: 'Toucan Chatbot',
          webhookId: "77493b22-1d33-479f-8bdf-932ef3a8f43a",
          lazySocket: true,
          themeName: "prism",
          frontendVersion: "v1",
          useSessionStorage: true,
          enableConversationDeletion: true,
          theme: "prism",
          themeColor: "#2563eb",
          
          exposeStore: true,
          userData: {
            id: 'botpress_chat',
            name: 'Jack Black',
          },
        })
      }
      setChatbotLoaded(true);
    }
    
  }, [firstEffectDone])

  // console.log("productType: "+productType)
  // if(productType){
  //   console.log("productType is true")
  // }

  if(chatbotLoaded){
    console.log('Chatbot loaded')

    // Get selected options
    window.botpressWebChat.onEvent(
      function (event) {
        if (event.type === 'TRIGGER') {
          let data = event.value;
          if (data.hasOwnProperty('product_type')) {
            setProductType(data.product_type);
          } else if (data.hasOwnProperty('product_filter')) {
            setProductFilter(data.product_filter);
          }

          window.botpressWebChat.sendPayload({
            type: 'text',
            payload: {
              cheapestPhone: cheapestPhone,
            }
          })

          if(productType && productFilter){
            console.log("execute=ing query")
            
            
            
          }
        }
      },
      ['TRIGGER']
    )

    

    // window.botpressWebChat.sendPayload({
    //   type: 'trigger',
    //   payload: {
    //     phone: "wassup",
    //   },
    // })



    // window.botpressWebChat.onEvent(
    //   function (event) {
    //     if (event.type === 'MESSAGE.SELECTED') {
    //       if (productType !== '' && productFilter !== '') {

    //         console.log('productType: ' + productType);
    //         console.log('productFilter: ' + productFilter);

            
    //       }
    //     }
    //   }, ['MESSAGE.SELECTED']
    // )
    
  }

  return (
    <>
      <div id="webchat" />
    </>
  )
}
 
export default Chatbot