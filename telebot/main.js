var nodeTelegramBotApi = require("node-telegram-bot-api")

var token = '1059129730:AAGSsVezEKPww_9Gsw1wDcS3McgT5AnDcjo'; 

var chatID = '@freelancertest'; 

var html = '<strong>Welcome to Freelancer</strong>\n\n'+
'🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖\n\n'+
'<i>italic</i>, <em>About: Freelancer is a sharing platform curated for businesses\n and anyone looking to outsource their small projects</em>\n'+
'<a href="https://www..club/">Insert URL here</a>\n'+
'🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩';

var buttons = [
    [
        {"text": "Click here to post a Job", "url": "https://github.com/html5-ninja/inline-button-for-telegram-channel"}, 
    ]
];

bot = new nodeTelegramBotApi(token, {polling: true});

bot.sendMessage(chatID, html, 
    {
        parse_mode: "HTML",
        disable_web_page_preview:true,  
        "reply_markup": {
            "inline_keyboard": buttons
        }
    }
);