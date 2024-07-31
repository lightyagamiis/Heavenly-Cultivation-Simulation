const fs = require('fs');
const path = require('path');
const characterUtils = require('../utils/characterUtils');

module.exports = (bot) => {
  bot.onText(/\/createCharacter/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Enter your character name:');
    
    bot.once('message', (response) => {
      const name = response.text;

      bot.sendMessage(chatId, 'Choose your race (human, demon, deity):');
      
      bot.once('message', (response) => {
        const race = response.text.toLowerCase();

        bot.sendMessage(chatId, 'Enter initial stats (format: health, attack, defense):');
        
        bot.once('message', (response) => {
          const stats = response.text.split(',').map(Number);
          const [health, attack, defense] = stats;

          const newCharacter = characterUtils.createCharacter(name, race, health, attack, defense);

          const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
          characters.push(newCharacter);
          fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
          
          bot.sendMessage(chatId, `Character ${name} the ${race} created!`);
        });
      });
    });
  });
};
