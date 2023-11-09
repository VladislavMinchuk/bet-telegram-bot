const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const env = require('dotenv');
env.config();

const myId = process.env.MY_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

const welcomeTxt = `Напишіть, шо там у Вас?\nТільки текст або одна картинка і текст`;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(welcomeTxt));

bot.command('test', (ctx) => ctx.reply('Hey there'));

bot.on(message('text'), async (ctx) => {
  const { text } = ctx.update.message;
  const { first_name } = ctx.update.message.from;
  
  // Replay to user
  ctx.reply('Прийнято', {reply_to_message_id: ctx.update.message.message_id});
  
  ctx.telegram.sendMessage(
    myId,
    `NEW MSG:\n\n${text}`,
    // `NEW MSG:\n*${first_name}*\n\n${text}`,
    {parse_mode: 'MarkdownV2'}
  ); // Send to me
});
  
bot.on(message('photo'), (ctx) => {
  const { photo, caption } = ctx.update.message;
  
  ctx.telegram.sendPhoto(myId, photo.pop().file_id, { caption });
    
  // Replay to user
  ctx.reply('Прийнято', {reply_to_message_id: msgId});
});


// bot.command('check', async (ctx) => {
//       reply_markup: {
//         inline_keyboard: [[ { text: "Open in browser", url: currentZuluUrl } ]]
//       }
// });

// bot.command("remove", ctx => {
//   ctx.reply(':)', Markup.removeKeyboard())
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
