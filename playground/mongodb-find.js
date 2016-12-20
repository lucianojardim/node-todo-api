//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //get property using deconstructor

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //   _id: new ObjectID('5858a526d3d696155889a22b')
    // }).toArray().then((docs) => {
    //   console.log('List of Todos in the database');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // },(err) =>{
    //   console.log('Unable to fetch Todos',err);
    // });

    db.collection('Todos').find().count().then((count) => {
      console.log(`count Todos in the database:${count} `);
    },(err) =>{
      console.log('Unable to fetch Todos',err);
    });

    //db.close();
});
