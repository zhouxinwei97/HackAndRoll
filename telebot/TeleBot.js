var nodeTelegramBotApi = require("node-telegram-bot-api");


exports.message = function (url, job_title, pay, job_desc, telegramhandle, jobID, category) {

    token = '1059129730:AAGSsVezEKPww_9Gsw1wDcS3McgT5AnDcjo';
    chatID = '@HackandRolltrials';
    var buttons = [
        [{
                "text": "Click to Apply",
                "url": url
            },
            {
                "text": "Contact",
                "url": "https://t.me/" + telegramhandle

            }
        ]
    ];
    var html = '<strong> New ' + category + ' Project </strong> \n\n<strong> Job title: ' + job_title + ' </strong>\n\n' + ' Pay: ' + pay + ' \n\n' + ' Job Description: ' + job_desc;
    console.log(html);
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

    bot.stopPolling()

}