const fs = require('fs');
const path = require('path');
const inventoryUtils = require('../utils/inventoryUtils');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;
  const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
  const userCharacter = characters.find(char => char.id === msg.from.id);

  if (!userCharacter) {
    bot.sendMessage(chatId, 'You need to create a character first! Use the button below.', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Create Character", callback_data: "create_character" }]
        ]
      }
    });
    return;
  }

  const inventory = userCharacter.inventory.map(item => `${item.name} (Attack: ${item.attack}, Defense: ${item.defense}, Magic: ${item.magic})`).join('\n');
  bot.sendMessage(chatId, `Inventory:\n${inventory}`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Add Item", callback_data: "add_item" }],
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    if (callbackQuery.data === "add_item") {
      bot.sendMessage(chatId, 'Enter item name:');

      bot.once('message', (itemResponse) => {
        const itemName = itemResponse.text;
        const newItem = inventoryUtils.createItem(itemName);
        inventoryUtils.addItemToInventory(userCharacter, newItem);

        fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
        bot.sendMessage(chatId, `${itemName} added to your inventory.`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Back to Inventory", callback_data: "inventory" }]
            ]
          }
        });
      });
    }
  });
};
