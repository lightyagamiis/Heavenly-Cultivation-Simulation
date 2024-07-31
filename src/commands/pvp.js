const fs = require('fs');
const path = require('path');
const pvpUtils = require('../utils/pvpUtils');

module.exports = (bot, msg, opponentId) => {
  const chatId = msg.chat.id;
  const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
  const userCharacter = characters.find(char => char.id === msg.from.id);
  const opponentCharacter = characters.find(char => char.id === opponentId);

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

  if (!opponentCharacter) {
    bot.sendMessage(chatId, 'Opponent not found.');
    return;
  }

  const battleResult = pvpUtils.fight(userCharacter, opponentCharacter);

  if (battleResult.winner === 'character') {
    userCharacter.experience += battleResult.experienceGained;
    opponentCharacter.experience += battleResult.experienceLost;
  } else {
    opponentCharacter.experience += battleResult.experienceGained;
    userCharacter.experience += battleResult.experienceLost;
  }

  fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
  bot.sendMessage(chatId, battleResult.message, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });
};
