const { getCurrentZuluPage, getOldZuluPage } = require('./api');
const { parseResToString } = require('./helpers');

const { Telegraf } = require('telegraf');

// Should remove
const BOT_TOKEN="1851079911:AAGWyQNfQbzT-WiUT_peqZYTWimxdvY1evQ";

// (async function () {
//   try {
//     const res = await getOldZuluPage();
    
//     console.log(parseResToString(res));
//   } catch (error) {
//     console.log(error);
//   }
// })();

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('check', async (ctx) => {
  try {
    const res = await getCurrentZuluPage();
    const string = parseResToString(res).join();

    if (!string.length) ctx.reply('Nothing')
    else ctx.reply(string);

  } catch (error) {
    console.log(error);
  }
});
bot.command('old', async (ctx) => {
  try {
    const res = await getOldZuluPage();
    const string = parseResToString(res).join();

    ctx.reply(string);
  } catch (error) {
    console.log(error);
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
