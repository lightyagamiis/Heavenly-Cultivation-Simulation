const fs = require('fs');
const path = require('path');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;
  const story = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/story.json')));

  bot.sendMessage(chatId, story.introduction, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Begin Journey", callback_data: "begin_journey" }]
      ]
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    if (callbackQuery.data === "begin_journey") {
      // Handle story progression logic here
    }
  });
};
