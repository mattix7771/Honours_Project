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