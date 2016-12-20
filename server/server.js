var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Set builtin Promise library as default

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text:{
        type:String
    },
    completed:{
        type: Boolean
    },
    completedAt:{
        type: Number
    }
});

// var newTodo = new Todo({
//     text:'Cook dinner'
// });

var otherTodo = new Todo({
    text:'Feed the cat',
    completed:true,
    completedAt: 123
});

// newTodo.save().then((doc)=>{
//     console.log(`Saved todo: ${doc}`);
// }, (e)=>{
//     console.log('Unable to save todo');
// });

otherTodo.save().then((doc)=>{
    console.log(`Saved todo: ${doc}`);
}, (e)=>{
    console.log('Unable to save todo');
});