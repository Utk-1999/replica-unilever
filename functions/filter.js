
exports.handler = function(event, context, callback) {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    var response = ""
    var redirectURI = ""
    var role = []
    if (event.headers['client-ip'] == '86.0.19.200') {
        role = ["forbidden"]
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
        role = ["allowed"]
        redirectURI = '/hidden/allowed.html'
        response = {
            statusCode: 200,
            headers: {
                Location: redirectURI,
                'Cache-Control': 'no-cache'
            }
        }
    }
    console.log(response);
    callback(null, response);
}