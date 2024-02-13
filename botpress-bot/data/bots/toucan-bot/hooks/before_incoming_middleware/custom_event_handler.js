  // Catch the event
  if (event.type === 'proactive-trigger') {
    const eventDestination = {
      channel: event.channel,
      target: event.target,
      botId: event.botId,
      threadId: event.threadId
    }

    // Skip event processing
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)

    // Execute starting node
    const sessionId = bp.dialog.createId(event)
    bp.dialog.jumpTo(sessionId, event, 'Main', 'entry')
    bp.dialog.processEvent(sessionId, event)
  }