const fs = require('fs');
const path = require('path');
const characterUtils = require('../utils/characterUtils');

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

  const levelUpResult = characterUtils.levelUpCharacter(userCharacter);
  if (levelUpResult) {
    fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
    bot.sendMessage(chatId, `Congratulations! You've leveled up to level ${userCharacter.level}.`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Back to Menu", callback_data: "menu" }]
        ]
      }
    });
  } else {
    bot.sendMessage(chatId, `You need more experience to level up.`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Back to Menu", callback_data: "menu" }]
        ]
      }
    });
  }
};
