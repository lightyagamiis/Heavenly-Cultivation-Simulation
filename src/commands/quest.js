const fs = require('fs');
const path = require('path');
const questUtils = require('../utils/questUtils');

module.exports = (bot) => {
  bot.onText(/\/quests/, (msg) => {
    const chatId = msg.chat.id;
    const quests = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/quests.json')));

    const questList = quests.map(quest => `${quest.name}: ${quest.description}`).join('\n');
    bot.sendMessage(chatId, `Available Quests:\n${questList}`);
  });

  bot.onText(/\/acceptQuest (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const questName = match[1];
    const quests = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/quests.json')));
    const quest = quests.find(q => q.name === questName);

    if (!quest) {
      bot.sendMessage(chatId, `Quest "${questName}" not found.`);
      return;
    }

    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    questUtils.assignQuestToCharacter(userCharacter, quest);
    fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

    bot.sendMessage(chatId, `Quest "${questName}" accepted!`);
  });

  bot.onText(/\/completeQuest (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const questName = match[1];
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);

    if (!userCharacter) {
      bot.sendMessage(chatId, 'You need to create a character first! Use /createCharacter.');
      return;
    }

    const quest = userCharacter.quests.find(q => q.name === questName);
    if (!quest) {
      bot.sendMessage(chatId, `You haven't accepted the quest "${questName}".`);
      return;
    }

    questUtils.completeQuest(userCharacter, quest);
    fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

    bot.sendMessage(chatId, `Quest "${questName}" completed!`);
  });
};
