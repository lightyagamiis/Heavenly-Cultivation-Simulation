const fs = require('fs');
const path = require('path');
const marketplaceUtils = require('../utils/marketplaceUtils');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Marketplace:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "View Items", callback_data: "view_items" }],
        [{ text: "Buy Item", callback_data: "buy_item" }],
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    const data = callbackQuery.data;
    const marketItems = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));

    if (data === "view_items") {
      const itemList = marketItems.map(item => `${item.name}: ${item.price} gold`).join('\n');
      bot.sendMessage(chatId, `Marketplace Items:\n${itemList}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Back to Marketplace", callback_data: "marketplace" }]
          ]
        }
      });
    }

    if (data === "buy_item") {
      bot.sendMessage(chatId, 'Enter item name to buy:');
      bot.once('message', (itemResponse) => {
        const itemName = itemResponse.text;
        const item = marketItems.find(i => i.name === itemName);

        if (!item) {
          bot.sendMessage(chatId, `Item ${itemName} not found.`, {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Back to Marketplace", callback_data: "marketplace" }]
              ]
            }
          });
          return;
        }

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

        if (userCharacter.gold < item.price) {
          bot.sendMessage(chatId, `You don't have enough gold to buy ${itemName}.`, {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Back to Marketplace", callback_data: "marketplace" }]
              ]
            }
          });
          return;
        }

        userCharacter.gold -= item.price;
        userCharacter.inventory.push(item);
        fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

        bot.sendMessage(chatId, `You bought ${itemName} for ${item.price} gold.`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Back to Marketplace", callback_data: "marketplace" }]
            ]
          }
        });
      });
    }
  });
};
