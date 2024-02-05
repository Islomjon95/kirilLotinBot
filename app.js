const TelegramBot = require('node-telegram-bot-api');
const token = "6472532692:AAHVKbZFOTysnMb9kcY7fV8-PF3orQO_J0k";
const {lotinga , kirillga} = require("./algoritm")
const bot = new TelegramBot(token, {polling: true});
let lotincha = false;
let kirillcha = false;

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const fullName = msg.chat.first_name;

    switch (msg.text) {
        case '/start':
            bot.sendMessage(chatId, `Assalomu aleykum <i><b>${fullName}</b></i> ! Botimizga Xush kelibsiz! Botimiz haqida to'liq ma'lumot olish uchun /info ni bosing`, { parse_mode: 'HTML' });
            break;
        case '/info':
            bot.sendMessage(chatId, "Bu bot matnlarni kirildan lotin ga lotindan kirilga o'zgartirib beradi. Agar siz matnni lotincha ko'rinishini hohlasangiz /lotin ni ustiga bosing. Agar siz matnni kirilcha ko'rinishda xohlasangiz /kiril ni ustiga bosing");
            break;
        case '/lotin':
            kirillcha = false;
            bot.sendMessage(chatId, "Siz kirilcha matnni yuborishingiz mumkin");
            lotincha = true;
            break;
        case '/kiril':
            lotincha = false;
            bot.sendMessage(chatId, "Siz lotincha matnni yuborishingiz mumkin");
            kirillcha = true;
            break;
        default:
            if (lotincha) {
                const krilltolotin = lotinga(msg.text);
                bot.sendMessage(chatId, krilltolotin);
            } else if (kirillcha) {
                const lotintokirill = kirillga(msg.text);
                bot.sendMessage(chatId, lotintokirill);
            }
            break;
    }
});

