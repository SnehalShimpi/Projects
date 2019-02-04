var userModel = require('../models/user');
var config = require('../config/config');
var jwt = require('jwt-simple');
var users = {

    userInfo : function (req, res) {
        var token = req.body.token || req.headers['token'];
        var decode = jwt.decode(token,config.secretKey);
        userModel.findOne(
            { $and:[
                      {'username' : decode.username},
                    ]
            },
             function(err, user)
             {
                 console.log(req.body.username)
                // console.log(req.body.password)
                 console.log("************");
                 console.log(user);
              
                 if(err || !user) {
                    res.status(200).json({status:false , message: 'Authentication Error:', docs:''});
                  }
                  else {
                     res.status(200).json({status:true , message: ' successfull', user : user});
                  }
           
          });




}
}
module.exports = users;