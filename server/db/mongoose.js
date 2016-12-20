var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Set builtin Promise library as default

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports.mongoose = {mongoose};