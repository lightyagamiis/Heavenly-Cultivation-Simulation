const createMarketItem = (name, price) => {
    return {
      name,
      price,
      attack: Math.floor(Math.random() * 10) + 1,
      defense: Math.floor(Math.random() * 5) + 1,
      magic: Math.floor(Math.random() * 10) + 1
    };
  };
  
  module.exports = {
    createMarketItem
  };
  