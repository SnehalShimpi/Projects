var jwt = require('jwt-simple');
var userModel = require('../models/user');
var config = require('../config/config');
//var validateUser = require('./middlewares').validateRequest;
module.exports = function(req, res, next) {
  console.log("inside validateRequest");
  try {
    if( req.path == '/myapi/login/' ||
        req.path == '/myapi/states/' ||
        req.path == '/myapi/user/'  ||
        req.path =='/myapi/upload/' ||
        req.path == '/myapi/password/' 
  
       ){
    next();
  }

  else {
      console.log("inside validate token");
    var token = req.body.token || req.headers['token'];
    var decode = jwt.decode(token,config.secretKey);
    console.log(req.path);
    userModel.findOne({
      $and:[
          {'username':decode.username }
          ]
        }, function(err, user){
          // console.log("-----------------------------");
          // console.log(user);
          if(err || !user) {
            res.status(400).json({status:'error', message: 'Bad Request, token not valid'  });
          }
          else {
            console.log("user passed");
            next();
          }
        });
      }

  }
  catch(err) {
      console.log(err);
      res.status(400).json({"status":400, "message":  "Something is wrong, check again..."});
  }

};