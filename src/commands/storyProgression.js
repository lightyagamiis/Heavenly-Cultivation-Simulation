const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
  bot.onText(/\/storyProgression/, (msg) => {
    const chatId = msg.chat.id;
    const story = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/story.json')));

    bot.sendMessage(chatId, story.introduction);
    // Further story progression logic
  });
};
