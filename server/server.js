require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
      res.send({todos});
    }, (e) =>{
      res.status(400).send(e);
    });
  });

// GET /todos/1234112341234
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  };
  Todo.findById(id).then((todoById) => {
    if(!todoById){
      return res.status(404).send();
    }
    res.send({todoById});
  }).catch((e) =>{
    res.status(400).send();
  });
});

// DELETE /todos/1234112341234
app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  };
  Todo.findByIdAndRemove(id).then((todoById) => {
    if(!todoById){
      return res.status(404).send();
    }
    res.send({todoById});
  }).catch((e) =>{
    res.status(400).send();
  });
});

// PATCH /todos/1234112341234
app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']); //accepts only some properties

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  };
  if(_.isBoolean(body.completed) && (body.completed)){
    body.completedAt = new Date().getTime(); //Unix date: number of milisenconds since 01/01/1970
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) =>{
    res.status(400).send();
  });
});

//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);
  user.save().then(() => {
    //res.send(user);
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user); // x-auth is a custom header
  }, (e) => {
    res.status(400).send(e);
  });
});

//Example with private route (require authentication)
app.get('/users/me', (req,res) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user) {

    }
    res.send(user);
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
