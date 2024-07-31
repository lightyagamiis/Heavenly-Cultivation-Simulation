const fs = require('fs');
const path = require('path');
const inventoryUtils = require('../utils/inventoryUtils');

module.exports = (bot) => {
  bot.onText(/\/inventory/, (msg) => {
    const chatId = msg.chat.id;
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    const inventory = userCharacter.inventory.map(item => `${item.name} (Attack: ${item.attack}, Defense: ${item.defense})`).join('\n');
    bot.sendMessage(chatId, `Inventory:\n${inventory}`);
  });

  bot.onText(/\/addItem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const itemName = match[1];
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    const newItem = inventoryUtils.createItem(itemName);
    inventoryUtils.addItemToInventory(userCharacter, newItem);

    fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
    bot.sendMessage(chatId, `${itemName} added to your inventory.`);
  });
};
