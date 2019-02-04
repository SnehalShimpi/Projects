var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user =  new Schema({
  firstname : String,
  lastname  : String,
  birthdate : String,
  gender    :{type: String,enum:['female','male']},
  hobby     :[{type: String, enum: ['singing', 'dancing', 'acting','cricket']}],
  phoneNo   : String,
  address   : String,
  city      : String,
  state     : String,
  zipcode   : String,  
  email     : String,
  password  : String,
  confirmPassword : String,
  username : String,
  ProfPic : String
});



module.exports = mongoose.model('user', user); 