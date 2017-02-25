// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, unique:true,required: true },
  password: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
// make this available to our users in our Node applications
module.exports  = mongoose.model('User', userSchema);
