//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //get property using deconstructor

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Luciano Jardim',
    //     age: 49,
    //     location: 'Muscatine,IA'
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('Unable to insert User', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined,2)); // ops is an array with the data inserted
    //     console.log(result.ops[0]._id.getTimestamp());

    //});

    db.close();
});