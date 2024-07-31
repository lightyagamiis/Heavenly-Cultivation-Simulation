const fs = require('fs');
const path = require('path');
const worldEventsUtils = require('../utils/worldEventsUtils');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'World Events:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Current Event", callback_data: "current_event" }],
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    const data = callbackQuery.data;
    const events = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/events.json')));

    if (data === "current_event") {
      const event = worldEventsUtils.getCurrentEvent(events);
      bot.sendMessage(chatId, `Current World Event: ${event.name}\n${event.description}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Back to World Events", callback_data: "world_events" }]
          ]
        }
      });
    }
  });
};
