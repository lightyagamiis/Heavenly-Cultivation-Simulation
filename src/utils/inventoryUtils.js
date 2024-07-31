const createItem = (name) => {
    return {
      name,
      attack: Math.floor(Math.random() * 10) + 1,
      defense: Math.floor(Math.random() * 5) + 1
    };
  };
  
  const addItemToInventory = (character, item) => {
    character.inventory.push(item);
  };
  
  const removeItemFromInventory = (character, itemName) => {
    character.inventory = character.inventory.filter(item => item.name !== itemName);
  };
  
  module.exports = {
    createItem,
    addItemToInventory,
    removeItemFromInventory
  };
  