const assignQuestToCharacter = (character, quest) => {
    if (!character.quests) {
      character.quests = [];
    }
    character.quests.push(quest);
  };
  
  const completeQuest = (character, quest) => {
    character.quests = character.quests.filter(q => q.name !== quest.name);
    character.experience += quest.reward.experience;
  
    quest.reward.items.forEach(item => {
      character.inventory.push(item);
    });
  };
  
  module.exports = {
    assignQuestToCharacter,
    completeQuest
  };
  