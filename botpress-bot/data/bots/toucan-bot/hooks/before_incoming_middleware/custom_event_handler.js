  // Catch the event
  const hook = async () => {
    // Get event
    if (event.type === 'proactive-trigger') {
      const sessionId = bp.dialog.createId(event)
      await bp.dialog.jumpTo(sessionId, event, 'Main', 'entry')
      bp.dialog.processEvent(sessionId, event)

      // Skip processing
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
      event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)
      event.setFlag(bp.IO.WellKnownFlags.SKIP_NATIVE_NLU, true)
      event.setFlag(bp.IO.WellKnownFlags.SKIP_QNA_PROCESSING, true)
    }
  }
  return hook()