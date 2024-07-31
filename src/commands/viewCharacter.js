const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
  bot.onText(/\/viewCharacter/, (msg) => {
    const chatId = msg.chat.id;
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    bot.sendMessage(chatId, `Character: ${userCharacter.name}\nRace: ${userCharacter.race}\nLevel: ${userCharacter.level}\nExperience: ${userCharacter.experience}\nHealth: ${userCharacter.health}\nAttack: ${userCharacter.attack}\nDefense: ${userCharacter.defense}\nSkills: ${userCharacter.skills.join(', ')}\nInventory: ${userCharacter.inventory.map(item => item.name).join(', ')}\nJob: ${userCharacter.job}`);
  });
};
