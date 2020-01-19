
const telebot = require('../telebot/TeleBot.js')
const express = require('express');
const path = require('path');
const sql = require("mssql");
const bodyParser = require('body-parser');
const app = express();
var router = express.Router();

var jobID = 0; 
app.use(bodyParser());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

// index page
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname  + "/../client/Homepage.html"));
});

// About page
app.get("/about", function(req,res) {
    res.sendFile(path.resolve(__dirname  + "/../client/about.html"));
});

app.get("/postjob", function(req,res) {
    res.sendFile(path.resolve(__dirname  + "/../client/postjob.html"));

}); 

app.get("/signin", function(req,res){
    res.sendFile(path.resolve(__dirname  + "/../client/SignIn.html"));
});

app.get("/apply", function(req,res){
    res.sendFile(path.resolve(__dirname  + "/../client/ClickToApply.html"));
});

app.post("/postjob", function(req,res){ 
    // console.log(req);
    console.log(req.body);
    var name = req.body.name;
    var hp = req.body.phonenum;
    var price = req.body.price;
    var username = req.body.username;
    var descr = req.body.desc; 
    var category = req.body.category;
    var values = "'" + name + "', '" + price + "', '" + username + "', '" + hp + "', '" + descr + "', '" + category + "'"; 
    var query = "INSERT INTO posts (title, price, username, hp, category, descr) VALUES ( " + values + ");";
    executeQuery(query, function(response) {
        if (response.includes("200 OK")) {
            getJobID(function (callback) {

            });
            console.log(jobID);
            telebot.message("www.google.com", name, price, descr, username, jobID, category); 
            jobID ++;
            res.sendFile(path.resolve(__dirname  + "/../client/success.html")); 
        } else {
            res.sendFile(path.resolve(__dirname  + "/../client/tryagain.html")); 
        }
    });

});


app.get("/api/user", function (req, res) {
    var query = "Select * from users";
    executeQuery(callback, query);
});

function executeQuery(sqlquery, callback) {


    // database server set-up with azure 
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
        request.query(sqlquery, function (err, res, ) {
            if (err) {
                console.log(err);
                var code = '404 not found';

            } else {
                // console.table(res.recordset);
                var code = "200 OK";
                console.log(res);
                sql.close();
            }
            return callback(code); 
            // console.log(code);
        });

    });

}


function getJobID(callback) {


    // database server set-up with azure 
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
        var sqlquery = "SELECT TOP(1) * from posts order by post_id desc";
        request.query(sqlquery, function (err, res, ) {
            if (err) {
                console.log(err);
                var code = '404 not found';

            } else {
                // console.table(res.recordset);
                var code = "200 OK";
                postids = res.recordset[0].post_id; 
                jobID += postids;
                sql.close();
            }
        });

    });

}



//GET API
app.get("/api/users", function (req, res) {
    var query = "select * from [users]";
    console.log(query);
    executeQuery(res, query);
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

app.use(express.static(__dirname + '/../client/'));
module.exports = router;
const port = process.env.PORT || 5000;
app.listen(port);


console.log('App is listening on port ' + port);


