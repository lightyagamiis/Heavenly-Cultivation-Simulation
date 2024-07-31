const fs = require('fs');
const path = require('path');
const characterUtils = require('../utils/characterUtils');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Enter your character name:');

  bot.once('message', (response) => {
    const name = response.text;

    bot.sendMessage(chatId, 'Choose your race:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Human", callback_data: "race_human" }],
          [{ text: "Demon", callback_data: "race_demon" }],
          [{ text: "Deity", callback_data: "race_deity" }],
          [{ text: "Elf", callback_data: "race_elf" }],
          [{ text: "Dwarf", callback_data: "race_dwarf" }]
        ]
      }
    });

    bot.once("callback_query", (raceQuery) => {
      const race = raceQuery.data.split("_")[1];

      bot.sendMessage(chatId, 'Choose your class:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Warrior", callback_data: "class_warrior" }],
            [{ text: "Mage", callback_data: "class_mage" }],
            [{ text: "Rogue", callback_data: "class_rogue" }]
          ]
        }
      });

      bot.once("callback_query", (classQuery) => {
        const classType = classQuery.data.split("_")[1];

        bot.sendMessage(chatId, 'Enter initial stats (format: health, attack, defense, magic):');

        bot.once('message', (statsResponse) => {
          const stats = statsResponse.text.split(',').map(Number);
          const [health, attack, defense, magic] = stats;

          const newCharacter = characterUtils.createCharacter(name, race, classType, health, attack, defense, magic);

          const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
          characters.push(newCharacter);
          fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

          bot.sendMessage(chatId, `Character ${name} the ${race} ${classType} created!`, {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Back to Menu", callback_data: "menu" }]
              ]
            }
          });
        });
      });
    });
  });
};
