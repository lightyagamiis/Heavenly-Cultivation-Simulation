module.exports = (bot, msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Main Menu', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "View Character", callback_data: "view_character" }],
          [{ text: "Battle", callback_data: "battle" }],
          [{ text: "Quests", callback_data: "quests" }],
          [{ text: "Inventory", callback_data: "inventory" }],
          [{ text: "Guild", callback_data: "guild" }],
          [{ text: "Marketplace", callback_data: "marketplace" }],
          [{ text: "World Events", callback_data: "world_events" }]
        ]
      }
    });
  };
  