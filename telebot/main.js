var nodeTelegramBotApi = require("node-telegram-bot-api")


var token = '1059129730:AAGSsVezEKPww_9Gsw1wDcS3McgT5AnDcjo'; 

var chatID = '@freelancertest'; 

var html = 'Hey this your awesome message\n\n'+
'🤖🤖🤖🤖🤖🤖🤖🤖🤖🤖\n\n'+
'<b>bold</b>, <strong>bold</strong>\n'+
'<i>italic</i>, <em>italic</em>\n'+
'<a href="https://www.forex-signals.club/">inline URL</a>\n'+
'<a href="tg://user?id=@zied_hosni">inline mention of a user</a>\n'+
'<code>inline fixed-width code</code>\n'+
'<pre>pre-formatted fixed-width code block</pre>\n\n'+
'🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩';


var buttons = [
    [
        {"text": "See on Github", "url": "https://github.com/html5-ninja/inline-button-for-telegram-channel"}, 
        {"text": "Follow me", "url": "https://twitter.com/zied_hosni"}
    ],
    [
        {"text": "🎖 Join our forex channel 🎖", "url": "https://t.me/forex_signals_club"}
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