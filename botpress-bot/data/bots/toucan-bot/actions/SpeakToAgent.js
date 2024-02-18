  var axios = require('axios')

  /**
   * Calls a trained LLM and gets a response from it
   * @title LLM API Call
   * @category Custom
   * @param {string} prompt - message to send to LLM
   */
  const myAction = async prompt => {
    var config = {
      method: 'post',
      url: `http://localhost:5000/chat`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: { prompt: prompt }
    }

    const response = await axios(config)

    console.log(response.data)

    bp.cms.renderElement('builtin_text', { text: response.data.reply, typing: true }, event).then(payloads => {
      bp.events.replyToEvent(event, payloads)
    })
  }

  return myAction(args.prompt)