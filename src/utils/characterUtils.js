const { v4: uuidv4 } = require('uuid');

const createCharacter = (name, race, classType, health, attack, defense, magic) => {
  return {
    id: uuidv4(),
    name,
    race,
    class: classType,
    level: 1,
    experience: 0,
    health,
    attack,
    defense,
    magic,
    skills: [],
    inventory: [],
    quests: [],
    job: 'Novice',
    guild: null
  };
};

const levelUpCharacter = (character) => {
  const levelUpThreshold = character.level * 100;
  while (character.experience >= levelUpThreshold) {
    character.level += 1;
    character.experience -= levelUpThreshold;
    character.health += 10;
    character.attack += 5;
    character.defense += 5;
    character.magic += 5;

    if (character.level % 30 === 0) {
      character.job = 'Job Change Required';
    }
  }
};

module.exports = {
  createCharacter,
  levelUpCharacter
};
