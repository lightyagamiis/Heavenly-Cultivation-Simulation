const fs = require('fs');
const path = require('path');
const guildUtils = require('../utils/guildUtils');

module.exports = (bot, msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Guild Menu:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Create Guild", callback_data: "create_guild" }],
        [{ text: "Join Guild", callback_data: "join_guild" }],
        [{ text: "Guild Info", callback_data: "guild_info" }],
        [{ text: "Back to Menu", callback_data: "menu" }]
      ]
    }
  });

  bot.on("callback_query", (callbackQuery) => {
    const data = callbackQuery.data;
    const characters = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters.json')));
    const userCharacter = characters.find(char => char.id === msg.from.id);
    const guilds = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guilds.json')));

    if (data === "create_guild") {
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

      if (userCharacter.guild) {
        bot.sendMessage(chatId, `You are already in a guild: ${userCharacter.guild}`);
        return;
      }

      bot.sendMessage(chatId, 'Enter guild name:');
      bot.once('message', (guildResponse) => {
        const guildName = guildResponse.text;
        const newGuild = guildUtils.createGuild(guildName, userCharacter.name);
        guilds.push(newGuild);
        fs.writeFileSync(path.join(__dirname, '../data/guilds.json'), JSON.stringify(guilds, null, 2));

        userCharacter.guild = guildName;
        fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));
        bot.sendMessage(chatId, `Guild ${guildName} created and you are now the leader!`);
      });
    }

    if (data === "join_guild") {
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

      bot.sendMessage(chatId, 'Enter guild name to join:');
      bot.once('message', (guildResponse) => {
        const guildName = guildResponse.text;
        const guild = guilds.find(g => g.name === guildName);

        if (!guild) {
          bot.sendMessage(chatId, `Guild ${guildName} not found.`);
          return;
        }

        userCharacter.guild = guildName;
        guild.members.push(userCharacter.name);
        fs.writeFileSync(path.join(__dirname, '../data/guilds.json'), JSON.stringify(guilds, null, 2));
        fs.writeFileSync(path.join(__dirname, '../data/characters.json'), JSON.stringify(characters, null, 2));

        bot.sendMessage(chatId, `You have joined the guild ${guildName}!`);
      });
    }

    if (data === "guild_info") {
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

      const guild = guilds.find(g => g.name === userCharacter.guild);
      if (!guild) {
        bot.sendMessage(chatId, 'You are not in a guild.');
        return;
      }

      bot.sendMessage(chatId, `Guild: ${guild.name}\nLeader: ${guild.leader}\nMembers: ${guild.members.join(', ')}`);
    }
  });
};
