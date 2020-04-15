const fetch = require('node-fetch')
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');
const cookie = require("cookie");

const getExpiryDate = () => {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  // const expReadable = new Date(exp);
  return exp;
};

const generateJWT = (role) =>
jwt.sign(
  {
    exp: getExpiryDate(),
    app_metadata: { 
      authorization: {
        roles: [role]
      } 
    },
    user_metadata: {
      name: "AB",
      email: "ab@ab.com"
    },
    user_id: uuidv4()
  },
  "secretsAreLiesInDisguise"
);

exports.handler = async (event, context) => {
    console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
    var response = ""
    var redirectURI = ""
    var sCode = ""
    var role = ""
    const blockedIP = ["86.0.19.200", "::1"]
    const clientIP = event.headers['client-ip']
    if (blockedIP.includes(clientIP)) {
        redirectURI = '/forbidden.html'
        sCode = "403"
        role = "forbidden"  
    }
    else {
      redirectURI = '/allowed.html'
      sCode = "302"
      role = "allowed"  
    }

    const oneWeeks = 7 * 24 * 3600000
    const netlifyCookie = cookie.serialize("nf_jwt",generateJWT(role) , {
      secure: false,
      maxAge: oneWeeks
    });

    response = {
      statusCode: sCode,
      headers: {
          Location: redirectURI,
          "Set-Cookie": netlifyCookie,
          'Cache-Control': 'no-cache'
      },
      body: ''
    }
    console.log(response);
    return response;
};