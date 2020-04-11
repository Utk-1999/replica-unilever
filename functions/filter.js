const cookie = require("cookie");
const axios = require("axios");
const jwt = require("jwt");
const uuid = require("uuid/v4");

exports.handler = function(event, context, callback) {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    var response = ""
    var redirectURI = ""
    var role = ""
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
    const getExpiryDate = () => {
        const exp = Math.floor(Date.now() / 1000) + 60 * 60;
        return exp;
      };
                    
    const generateJWT = () =>
        jwt.sign(
        {
            exp: getExpiry(),
            app_metadata: { 
            authorization: {
                roles: role
            } 
            },
            user_metadata: {
            name: "Anonymous"
            email: "anonymous@unknown.com"
            },
            user_id: uuidv4()
        },
        secret: "secretsAreLiesInDisguise"
    );

    console.log(response);
    callback(null, response);
}