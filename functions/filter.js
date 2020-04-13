import fetch from "node-fetch";

export function handler(event, context, callback) {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    var response = ""
    var redirectURI = ""
    if (event.headers['client-ip'] == '86.0.19.200') {
        redirectURI = '/forbidden.html'
        response =  {
            statusCode: 403,
            headers: {
                Location: redirectURI,
                'Cache-Control': 'no-cache'
            },
            };   
    }
    else {
        redirectURI = '/hidden/allowed.html'
        response = {
            statusCode: 200,
            headers: {
                Location: redirectURI,
                'Cache-Control': 'no-cache'
            },
        body: ""
        }
    }
/*
    return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.joke
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));*/

    console.log(response);
    callback(null, response);
}