const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validator: validator.isEmail,
    message: '{VALUE} is not a valid email address'
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]  
});

// Instance method
UserSchema.methods.toJSON = function () {
  var user = this; //JSON
  var userObject = user.toObject(); //Convert JSON to Object

  return _.pick(userObject, ['_id','email']);
};

//Instance method
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

  user.tokens.push({access,token});
  return user.save().then(() => {
    return token;
  });
};

//Model method
UserSchema.statics.findByAuthToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');  
  } catch (e) {
    
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'token.access': 'auth'
  });
}

var User = mongoose.model('User', UserSchema);

module.exports = {User}
