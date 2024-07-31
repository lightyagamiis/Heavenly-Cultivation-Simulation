const fs = require('fs');
const path = require('path');
const battleUtils = require('../utils/battleUtils');
const characterUtils = require('../utils/characterUtils');

module.exports = (bot) => {
  bot.onText(/\/battle/, (msg) => {
    const chatId = msg.chat.id;

    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    const monster = battleUtils.createMonster();

    const battleResult = battleUtils.fight(userCharacter, monster);

    if (battleResult.winner === 'character') {
      userCharacter.experience += battleResult.experienceGained;
      characterUtils.levelUpCharacter(userCharacter);
      fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
    }

    bot.sendMessage(chatId, battleResult.message);
  });
};
