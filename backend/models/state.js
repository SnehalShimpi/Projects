var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var state =  new Schema({
    state : String
    
  });

  module.exports = mongoose.model('state',state); 