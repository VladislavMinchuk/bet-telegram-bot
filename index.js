const { getCurrentZuluPage, getOldZuluPage } = require('./api');
const { parseResToString } = require('./helpers');

const { Telegraf, Markup } = require('telegraf');

// Should remove
const BOT_TOKEN="1851079911:AAGWyQNfQbzT-WiUT_peqZYTWimxdvY1evQ";

// (async function () {
//   try {
//     const res = await getCurrentZuluPage();
    
//     console.log(parseResToString(res));
//   } catch (error) {
//     console.log(error);
//   }
// })();

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));

bot.command('test', (ctx) => ctx.reply('Hey there'));
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
bot.command('check_old', async (ctx) => {
  try {
    const res = await getOldZuluPage();
    const string = parseResToString(res).join();

    ctx.reply(string);
  } catch (error) {
    console.log(error);
  }
});


// bot.command("onetime", ctx =>
// 	ctx.reply(
// 		"One time keyboard",
// 		Markup.keyboard(["/simple", "/inline", "/pyramid"]).oneTime().resize(),
// 	),
// );

// bot.command("inline", ctx => {
// 	return ctx.reply("<b>Coke</b> or <i>Pepsi?</i>", {
// 		parse_mode: "HTML",
// 		...Markup.inlineKeyboard([
// 			Markup.button.callback("Coke", "Coke"),
// 			Markup.button.callback("Pepsi", "Pepsi"),
// 		]),
// 	});
// });

// bot.command("remove", ctx => {
//   ctx.reply(':)', Markup.removeKeyboard())
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
