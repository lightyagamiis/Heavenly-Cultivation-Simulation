const createMonster = () => {
    return {
      name: 'Wild Demon',
      level: 1,
      health: 80,
      attack: 15,
      defense: 3,
      experience: 20
    };
  };
  
  const fight = (character, monster) => {
    let charHealth = character.health;
    let monsterHealth = monster.health;
  
    while (charHealth > 0 && monsterHealth > 0) {
      monsterHealth -= Math.max(0, character.attack - monster.defense);
      if (monsterHealth <= 0) {
        return {
          winner: 'character',
          message: `You defeated the ${monster.name}!`,
          experienceGained: monster.experience
        };
      }
  
      charHealth -= Math.max(0, monster.attack - character.defense);
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
  