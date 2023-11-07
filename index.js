const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

// Should remove
const myId = 479310193;
// Should remove
const BOT_TOKEN="1761220574:AAGrzSScdOe5EoRxKb8C8vr5_I0FAqW3bj4";

const welcomeTxt = `Напиши`;

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply(welcomeTxt));

bot.command('test', (ctx) => ctx.reply('Hey there'));

bot.on(message('text'), async (ctx) => {
  const { text } = ctx.update.message;
  const { first_name } = ctx.update.message.from;

  // Replay to user
  ctx.reply('Прийнято', {reply_to_message_id: ctx.message.message_id});

  ctx.telegram.sendMessage(
    myId,
    `NEW MSG:\n\n${text}`,
    // `NEW MSG:\n*${first_name}*\n\n${text}`,
    {parse_mode: 'MarkdownV2'}
  ); // Send to me
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
