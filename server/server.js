var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();

app.use(bodyParser.json()); //attach the body to req

app.post('/todos',(req,res) =>{
    //console.log(req.body); //access information provided by bodyParser
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) =>{
        res.status(400).send(e);
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000')
});

// var otherTodo = new Todo({
//     text:'   Edit this video   ',
//     completed:true,
//     completedAt: 123
// });

// otherTodo.save().then((doc)=>{
//     console.log(`Saved todo: ${doc}`);
// }, (e)=>{
//     console.log('Unable to save todo', e);
// });

//User
//email - required - trimmed - type String with minlenght of 1


// var user = new User({
//     email:'lucinaoj@ibm.com'
// });

// user.save().then((doc)=>{
//     console.log(`Saved user: ${doc}`);
// }, (e)=>{
//     console.log('Unable to save user', e);
// });