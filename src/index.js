const TelegramBot = require('node-telegram-bot-api');

// Replace with your actual bot token
const token = '7175502611:AAEs2atuRP-xIiyeddF_LVP8E-XERxZugdU';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the Cultivation Manhua Bot! Type /createCharacter to begin your journey.');
});

// Import other commands
require('./commands/createCharacter')(bot);
require('./commands/viewCharacter')(bot);
require('./commands/battle')(bot);
require('./commands/inventory')(bot);
require('./commands/storyProgression')(bot);
require('./commands/quest')(bot);
require('./commands/levelUp')(bot);
require('./commands/jobChange')(bot);

module.exports = bot;
