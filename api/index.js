
const telebot = require('../telebot/TeleBot.js')
const express = require('express');
const path = require('path');
const sql = require("mssql");
const bodyParser = require('body-parser');
const app = express();


app.get("/", function (req, res) {
    console.log(__dirname + "/../client/Homepage.html");
    // res.sendFile(path.resolve(__dirname  + "/../client/override.css"))
    res.sendFile(path.resolve(__dirname  + "/../client/Homepage.html"));
});

app.get("/api/user", function (req, res) {
    var query = "Select * from users";
    executeQuery(res, query);
});

function executeQuery(res, sqlquery) {


    // database server set-up with azure 
    var code = '';
    const dbConfig = {
        user: 'bossman69',
        password: 'MLislife123!',
        server: 'freelancehub.database.windows.net',
        database: 'freelancehub',
        port: 1433,
        options: {
            encrypt: true,
            rowCollectionOnRequestCompletion: true
        }
    };

    sql.connect(dbConfig, function (err) {

        console.log("connected");
        if (err) console.log(err);
        // create Request object
        let request = new sql.Request();
        // query to the database
        request.query(sqlquery, function (err, res) {
            if (err) {
                console.log(err);
                code = '404 not found';

            } else {
                // console.table(res.recordset);
                code = "200 ok";

                console.log(res);

                sql.close();
            }
            // console.log(code);
        });

    });
    return code;

}



//GET API
app.get("/api/users", function (req, res) {
    var query = "select * from [users]";
    console.log(query);
    executeQuery(res, query);
});

//POST API
app.post("/", function (req, res) {
    // INSERT into users (username, password) VALUES ('ABC', 'efg');
    var title = req.body.title;
    var price = req.body.price;
    var username = req.body.username; 
    var hp = req.body.HP;
    var descr = req.body.desc; 
    var values = "'" + title + "', '" + price + "', '" + username + "', '" + hp + "', '" + descr + "'"
    var query = "INSERT INTO posts (title, price, username, hp, descr) VALUES ('" + name + "', '" + password + "');";
    console.log(executeQuery(res, query));
    res.sendFile(__dirname + "/success.html");
});

//PUT API
app.put("/api/user/:id", function (req, res) {
    var query = "UPDATE [user] SET Name= " + req.body.Name + " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
    executeQuery(res, query);
});

// DELETE API
app.delete("/api/user /:id", function (req, res) {
    var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
    executeQuery(res, query);
});

// Telebot

// let val = telebot.message('www.google.com', 'Job', 'Pay', 'Desc');

app.use(express.static(__dirname + '../client'));
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


