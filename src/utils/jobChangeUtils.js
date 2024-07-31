const changeJob = (character) => {
    const jobs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/jobs.json')));
    const jobChangeRequirements = jobs.find(job => job.level === character.level);
  
    if (!jobChangeRequirements) {
      return false;
    }
  
    if (character.stats.health >= jobChangeRequirements.health &&
        character.stats.attack >= jobChangeRequirements.attack &&
        character.stats.defense >= jobChangeRequirements.defense) {
      character.job = jobChangeRequirements.newJob;
      return true;
    }
  
    return false;
  };
  
  module.exports = {
    changeJob
  };
  