const { v4: uuidv4 } = require('uuid');

const createGuild = (name, leader) => {
  return {
    id: uuidv4(),
    name,
    leader,
    members: [leader]
  };
};

module.exports = {
  createGuild
};
