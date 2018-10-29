'use strict';

module.exports = (NODE) => {
  const MessageBird = require('messagebird');
  let messageBird;

  const messageBirdOut = NODE.getOutputByName('messagebird');
  messageBirdOut.on('trigger', async (conn, state) => {
    if (!messageBird) {
      messageBird = new MessageBird(NODE.data.accessKey);
    }
    return messageBird;
  });
};
