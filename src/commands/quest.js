const fs = require('fs');
const path = require('path');
const questUtils = require('../utils/questUtils');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;
  const quests = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/quests.json')));

  const questList = quests.map(quest => `${quest.name}: ${quest.description}`).join('\n');
  bot.sendMessage(chatId, `Available Quests:\n${questList}`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Accept Quest", callback_data: "accept_quest" }],
        [{ text: "Complete Quest", callback_data: "complete_quest" }],
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    if (callbackQuery.data === "accept_quest") {
      bot.sendMessage(chatId, 'Enter quest name to accept:');

      bot.once('message', (questResponse) => {
        const questName = questResponse.text;
        const quest = quests.find(q => q.name === questName);

        if (!quest) {
          bot.sendMessage(chatId, `Quest "${questName}" not found.`);
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

        questUtils.assignQuestToCharacter(userCharacter, quest);
        fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

        bot.sendMessage(chatId, `Quest "${questName}" accepted!`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Back to Quests", callback_data: "quests" }]
            ]
          }
        });
      });
    }

    if (callbackQuery.data === "complete_quest") {
      bot.sendMessage(chatId, 'Enter quest name to complete:');

      bot.once('message', (questResponse) => {
        const questName = questResponse.text;
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

        const quest = userCharacter.quests.find(q => q.name === questName);
        if (!quest) {
          bot.sendMessage(chatId, `You haven't accepted the quest "${questName}".`);
          return;
        }

        questUtils.completeQuest(userCharacter, quest);
        fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

        bot.sendMessage(chatId, `Quest "${questName}" completed!`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Back to Quests", callback_data: "quests" }]
            ]
          }
        });
      });
    }
  });
};
