  // Catch the event
  if (event.type === 'proactive-trigger') {
    const eventDestination = {
      channel: event.channel,
      target: event.target,
      botId: event.botId,
      threadId: event.threadId
    }

    const product = event.payload.payload.payload.product

    // Skip event processing
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)

    // Make the bot respond with custom content instead

    bp.cms.renderElement('builtin_text', { text: product.price, typing: true }, eventDestination).then(payloads => {
      bp.events.replyToEvent(event, payloads)
    })
    bp.cms.renderElement('builtin_text', { text: 'Hello', typing: true }, eventDestination).then(payloads => {
      bp.events.replyToEvent(event, payloads)
    })
  }