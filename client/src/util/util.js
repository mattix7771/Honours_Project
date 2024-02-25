import ini from 'ini';

/** 
 * API call to log actions and the respective action code
 * @function
 * @param {string} message - The message to log.
 * @param {number} code - The code to log.
 * @returns {void}
 */ 
export function logAction(message, code){
	try {
		const response = fetch('/log', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ log: message, code: code }),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		console.log('Log successfully sent.');
	} catch (error) {
		console.error('Error:', error.message);
	}
};

/**
 * API call to get products by category
 * @function
 * @param {string} category - The category to search for.
 * @returns {object} - The products found.
 */
export async function getProductsByTitle(productTitle){

	try {
		const response = await fetch(`/products/${productTitle}`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  },
		});
	
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}

		const data = await response.json();
	
		return data;
  
	} catch (error) {
		console.error('Error:', error);
	}
};

/**
 * API call to get preset values from config file
 * @function
 * @param {string} section - The section of the config file to retrieve.
 * @returns {String} - The appropriate section of the config file.
 */
export async function getConfig(section){

	// check whether section is valid
	if (section != "Chatbot" && section != "webStore" && section != "all")
		return new Error('invlid config section')

  try {
		const response = await fetch(`/config`, {
			method: 'GET'
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const config = ini.parse(await response.text(), 'utf-8');

		if(section === "all"){
			return config;
		}

    const chatbotConfig = config[section];

		return chatbotConfig;

  } catch (error) {
		console.error('Error:', error);
  }
};