var nodeTelegramBotApi = require("node-telegram-bot-api")

var token = '1059129730:AAGSsVezEKPww_9Gsw1wDcS3McgT5AnDcjo';
var chatID = '@freelancertest';
var buttons = [
    [{
        "text": "Click to Apply",
        "url": "www.google.com"
    }]
];



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

var html = 'test message fk u ';




