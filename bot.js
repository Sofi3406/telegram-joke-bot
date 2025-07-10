const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.TOKEN
console.log("my token", token);

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/joke/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        console.log("My response",response);
        /*
        Hello@DESKTOP-QT2CABJ MINGW64 ~/Documents/Website development/NodeJS/telegram_bot (master)

My joke {
  type: 'general',
  setup: 'What is the difference between ignorance and apathy?',
  punchline: "I don't know and I don't care.",
  id: 244
}
*/
    const joke = await response.json();
    console.log("My joke",joke);


    const jokeText = `${joke.setup}\n jokev- ${joke.punchline}`;
    bot.sendMessage(chatId, jokeText);
  } catch (error) {
    bot.sendMessage(chatId, "Sorry, I couldn't get a joke right now.");
    console.error("Fetch error:", error);
  }
});
// for other messages
// For other messages
bot.on("message", (msg) => {
    if (msg.text.startsWith("/joke")) {
        return;
    }
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Type /joke for getting a random joke");
});

//environment variable  for private/secure data



//2 type of development dependencies and dependency 