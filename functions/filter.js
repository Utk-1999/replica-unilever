exports.handler = function(event, context, callback) {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    let response = ""
    let redirectURI= ""
    if (event.headers['client-ip'] == '86.0.19.200') {
        redirectURI = event.referer + 'forbidden.html'
        response =  {
            statusCode: 200,
            headers: {
                Location: redirectURI,
                'Cache-Control': 'no-cache'
            },
            body: `Your IP address ${event.headers['client-ip']} is forbidden` 
            };   
    }
    else {
        redirectURI = 'https://www.unilever.com/:splat'
        response = {
            statusCode: 200,
            headers: {
                Location: redirectURI,
                'Cache-Control': 'no-cache'
            },
            body: ''
    }
}
    console.log(response);
    callback(null, response);
  }