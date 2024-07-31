const fs = require('fs');
const path = require('path');

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

  bot.sendMessage(chatId, `Character: ${userCharacter.name}\nRace: ${userCharacter.race}\nClass: ${userCharacter.class}\nLevel: ${userCharacter.level}\nExperience: ${userCharacter.experience}\nHealth: ${userCharacter.health}\nAttack: ${userCharacter.attack}\nDefense: ${userCharacter.defense}\nMagic: ${userCharacter.magic}\nSkills: ${userCharacter.skills.join(', ')}\nInventory: ${userCharacter.inventory.map(item => item.name).join(', ')}\nJob: ${userCharacter.job}\nGuild: ${userCharacter.guild}`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });
};
