const fs = require('fs');
const path = require('path');
const characterUtils = require('../utils/characterUtils');

module.exports = (bot) => {
  bot.onText(/\/levelUp/, (msg) => {
    const chatId = msg.chat.id;
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    const levelUpResult = characterUtils.levelUpCharacter(userCharacter);
    if (levelUpResult) {
      fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
      bot.sendMessage(chatId, `Congratulations! You've leveled up to level ${userCharacter.level}.`);
    } else {
      bot.sendMessage(chatId, `You need more experience to level up.`);
    }
  });
};
