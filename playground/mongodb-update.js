//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //get property using deconstructor

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
      _id: new ObjectID('58591351c44dbb28d631b782')
    },{
      $set: {
        completed: true
      }
    },{
      $returnOriginal: false //get the orginal data back after the update
    }).then((result) => {
      console.log(result);
    });

    //db.close();
});
