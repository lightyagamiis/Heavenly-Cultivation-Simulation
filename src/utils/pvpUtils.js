const fight = (character, opponent) => {
    let charHealth = character.health;
    let opponentHealth = opponent.health;
  
    while (charHealth > 0 && opponentHealth > 0) {
      opponentHealth -= Math.max(0, character.attack - opponent.defense) + Math.max(0, character.magic - opponent.magic);
      if (opponentHealth <= 0) {
        return {
          winner: 'character',
          message: `You defeated ${opponent.name}!`,
          experienceGained: 50,
          experienceLost: 20
        };
      }
  
      charHealth -= Math.max(0, opponent.attack - character.defense) + Math.max(0, opponent.magic - character.magic);
    }
  
    return {
      winner: 'opponent',
      message: `You were defeated by ${opponent.name}.`,
      experienceGained: 50,
      experienceLost: 20
    };
  };
  
  module.exports = {
    fight
  };
  