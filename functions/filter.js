exports.handler = function(event, context, callback) {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    if (event.headers['client-ip'] == '86.0.19.200') {
        callback(null, {
            statusCode: 200,
            body: `Your IP address ${event.headers['client-ip']} is allowed`
            });   
    }
    callback(null, {
    statusCode: 403,
    body: `Your IP address ${event.headers['client-ip']} is forbidden`
    });
  }