const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    port:3307,
    database:'icc_data',
    user:'root',
    password:'03322179822'
});

connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log('MySQL Database is connected Succefully");')
    }
});

module.exports = connection;