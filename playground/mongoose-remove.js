const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove({_id:'585a6c0ee80e2fb2ad267829'}).then((todo) => console.log(todo));

//Todo.findByIdAndRemove
//Todo.findByIdAndRemove('585a6c0ee80e2fb2ad267829').then((todo) => console.log(todo));
