const { getCurrentZuluPage, getOldZuluPage, currentZuluUrl } = require('./api');
const { parseResToString } = require('./helpers');

const { Telegraf, Markup } = require('telegraf');

// Should remove
const BOT_TOKEN="1851079911:AAGWyQNfQbzT-WiUT_peqZYTWimxdvY1evQ";

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));

bot.command('test', (ctx) => ctx.reply('Hey there'));
bot.command('check', async (ctx) => {
  try {
    const res = await getCurrentZuluPage();
    const string = parseResToString(res).join();

    if (!string.length) ctx.reply('Nothing')
    else ctx.reply(string, {
      reply_markup: {
        inline_keyboard: [[ { text: "Open in browser", url: currentZuluUrl } ]]
      }
    });
  } catch (error) {
    console.log(error);
  }
});
bot.command('check_old', async (ctx) => {
  try {
    const res = await getOldZuluPage();
    const string = parseResToString(res).join();

    ctx.reply(string);
  } catch (error) {
    console.log(error);
  }
});

// bot.command("remove", ctx => {
//   ctx.reply(':)', Markup.removeKeyboard())
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
