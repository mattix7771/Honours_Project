  var axios = require('axios')

  /**
   * Calls a trained LLM and gets a response from it
   * @title LLM API Call
   * @category Custom
   * @param {string} prompt - message to send to LLM
   */
  const myAction = async prompt => {

    // API call to LLM
    var config = {
      method: 'post',
      url: `http://localhost:5000/chat`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: { prompt: prompt }
    }

    // get LLM response from API call
    const response = await axios(config)

    // Send LLM response to chat
    bp.cms.renderElement('builtin_text', { text: response.data.reply, typing: true }, event).then(payloads => {
      bp.events.replyToEvent(event, payloads)
    })
  }

  return myAction(args.prompt)