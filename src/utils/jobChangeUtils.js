const fs = require('fs');
const path = require('path');

const changeJob = (character) => {
  const jobs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/jobs.json')));
  const jobChangeRequirements = jobs.find(job => job.level === character.level);

  if (!jobChangeRequirements) {
    return false;
  }

  if (character.health >= jobChangeRequirements.health &&
      character.attack >= jobChangeRequirements.attack &&
      character.defense >= jobChangeRequirements.defense &&
      character.magic >= jobChangeRequirements.magic) {
    character.job = jobChangeRequirements.newJob;
    return true;
  }

  return false;
};

module.exports = {
  changeJob
};
