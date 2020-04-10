exports.handler = function(event, context, callback) {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    const response = ""
    if (event.headers['client-ip'] == '86.0.19.200') {
        response =  {
            statusCode: 200,
            body: `Your IP address ${event.headers['client-ip']} is forbidden` 
            };   
    }
    const redirectURI = 'https://www.unilever.com/:splat'
    response = {
        statusCode: 200,
        headers: {
            Location: redirectURI
        },
        body: ''
    }
    callback(null, response);
  }