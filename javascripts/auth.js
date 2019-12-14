const jwt = require('jsonwebtoken');
const auth = require('./config');

module.exports = {

  isLoggedIn: function(request, response) {
    var token = request.headers['x-access-token'];

    console.log("****token exists?****")
    if(!token) {
      response.json({
        authStatus: 'not logged in',
        code: 501
      })
      throw new Error('close');
    } else {
      console.log("logged in")
      return new Promise(function(resolve, reject){
        resolve(request);
      })
    }
  },
  
  verifyToken: function(request) {
    console.log("****token veritying process****")
    var token2 = request.headers['x-access-token'];

    if(token2){
      console.log('token: ', auth.secret)
      console.log('****start verifying token...****')
      
      const decoded = jwt.verify(token2, auth.secret);
      
      console.log('decoded id: ', decoded.ID);
      console.log('request.body: ', request.body);
      if(request.body.userID == decoded.ID){
        console.log('authenticated');
        return 1;
      } else {
        console.log('code: 501')
        response.json({
          authStatus: 'not logged in',
          code: 501
        })
        throw new Error('close');
      }
    }
  }
};