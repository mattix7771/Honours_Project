// Endpoint to log user movements throughout the application
export async function logActions (req, res) {
  const actionTime = new Date();
  const log = req.body.log;
  const actionCode = req.body.code;

  // Append log if unique
  const lastLine = fs.readFileSync(logDir, 'utf8').split('\r\n').slice(-1)[0].split(',').slice(3).join(',');
  const currentLine = `${log}`;
  
  if (lastLine != currentLine){
    fs.appendFile(logDir, '\r\n' + `${actionTime.toLocaleTimeString()},${(actionTime-sessionStart)/1000}s,${actionCode},${log}`, err => {if(err) {console.error(err)}});
  }

  res.sendStatus(200);
};