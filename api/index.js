const express = require('express');
const path = require('path');
const sql = require("mssql");
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


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

sql.connect(dbConfig, function (err, query) {

    console.log("connected");
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
    let sqlQuery = 'select * from users';
    // query to the database
    request.query(sqlQuery, function (err, res) {
        if (err) console.log(err);

        // console.log(res);
        console.table(res.recordset);
        // // res.send(res);
        sql.close();


    });

});


// //GET API
// app.get("/api/user", function(req , res){
//     var query = "select * from [users]";
//     console.log(query);
//     executeQuery (res, query);
// });

// //POST API
// app.post("/api/user", function(req , res){
//     var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
//     executeQuery (res, query);
// });

// //PUT API
// app.put("/api/user/:id", function(req , res){
//     var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//     executeQuery (res, query);
// });

// // DELETE API
// app.delete("/api/user /:id", function(req , res){
//     var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//     executeQuery (res, query);
// });


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);