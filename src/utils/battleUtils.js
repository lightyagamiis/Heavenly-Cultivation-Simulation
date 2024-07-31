const monsters = require('../data/monsters.json');

const createMonster = () => {
  const randomIndex = Math.floor(Math.random() * monsters.length);
  return monsters[randomIndex];
};

const fight = (character, monster) => {
  let charHealth = character.health;
  let monsterHealth = monster.health;

  while (charHealth > 0 && monsterHealth > 0) {
    monsterHealth -= Math.max(0, character.attack - monster.defense) + Math.max(0, character.magic - monster.magic);
    if (monsterHealth <= 0) {
      return {
        winner: 'character',
        message: `You defeated the ${monster.name}!`,
        experienceGained: monster.experience
      };
    }

    charHealth -= Math.max(0, monster.attack - character.defense) + Math.max(0, monster.magic - character.magic);
  }

  return {
    winner: 'monster',
    message: `You were defeated by the ${monster.name}.`
  };
};

module.exports = {
  createMonster,
  fight
};
