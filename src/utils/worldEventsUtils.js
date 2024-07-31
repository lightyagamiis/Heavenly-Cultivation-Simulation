const getCurrentEvent = (events) => {
    const currentTime = Date.now();
    return events.find(event => new Date(event.startTime).getTime() <= currentTime && new Date(event.endTime).getTime() >= currentTime);
  };
  
  module.exports = {
    getCurrentEvent
  };
  