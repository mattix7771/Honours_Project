




export function handleRequest(session, res, userPrompt){
  try {
    if (!userPrompt) {
      return new Error('No user prompt provided');
    }

    console.log("User: " + userPrompt);
    const reply = session.prompt(userPrompt);
    console.log("AI: " + reply);

    res.send(reply);
  } catch (error) {
    console.error(error);
  }
}