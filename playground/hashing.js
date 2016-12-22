const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//JWT
var data = {
    id: 10
};
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc')
console.log(decoded);

//CRYPTO-JS
// var message = 'I am user number 3';
// var hash = SHA256(message);
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecreatesalt').toString()
// }

// //token.data.id = 5;

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecreatesalt').toString();
// if (resultHash === token.hash){
//     console.log('Data was not changed');
// } else{
//     console.log('Data was changed. Do no trust it');
// }