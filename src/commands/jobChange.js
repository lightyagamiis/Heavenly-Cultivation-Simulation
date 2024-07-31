const fs = require('fs');
const path = require('path');
const jobChangeUtils = require('../utils/jobChangeUtils');

module.exports = (bot) => {
  bot.onText(/\/jobChange/, (msg) => {
    const chatId = msg.chat.id;
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    if (userCharacter.level % 30 !== 0) {
      bot.sendMessage(chatId, 'You can only change your job at level 30, 60, 90, etc.');
      return;
    }

    const jobChangeResult = jobChangeUtils.changeJob(userCharacter);
    if (jobChangeResult) {
      fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
      bot.sendMessage(chatId, `Congratulations! You've changed your job to ${userCharacter.job}.`);
    } else {
      bot.sendMessage(chatId, `Job change failed. You might need to complete specific quests or improve your stats.`);
    }
  });
};
