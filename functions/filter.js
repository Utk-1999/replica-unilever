const fetch = require("node-fetch");
const API_ENDPOINT = "https://icanhazdadjoke.com/";
exports.handler = function(event, context, callback) {
  var response = {}
  console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
 
  response = fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.joke
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
  callback (null, response);  
};