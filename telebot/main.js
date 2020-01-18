var nodeTelegramBotApi = require("node-telegram-bot-api");
const sql = require("mssql");

var token = '1059129730:AAGSsVezEKPww_9Gsw1wDcS3McgT5AnDcjo';
var chatID = '@freelancertest';
var buttons = [
    [{
        "text": "Click to Apply",
        "url": "127.0.0.1:5000"
    }]
];

var html = '<strong>Welcome to Freelancer</strong>\n\n' +
    '🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖\n\n' +
    '<i>italic</i>, <em>About: Freelancer is a sharing platform curated for businesses\n and anyone looking to outsource their small projects</em>\n' +
    '<a href="https://www..club/">Insert URL here</a>\n' +
    '🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩';

function sendMessage(chatID, token) {
    bot = new nodeTelegramBotApi(token, {
        polling: true
    });

    bot.sendMessage(chatID, html, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        "reply_markup": {
            "inline_keyboard": buttons
        }
    });


}

function getSQLmessage() {
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
            // res.send(res);
            sql.close();


        });

    });



}


sendMessage(chatID,token); 
getSQLmessage();
