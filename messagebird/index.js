'use strict';

module.exports = (NODE) => {
  const MessageBird = require('messagebird');
  let messageBird;

  const messageBirdOut = NODE.getOutputByName('messagebird');
  messageBirdOut.on('trigger', (conn, state, callback) => {
    if (!messageBird) {
      messageBird = new MessageBird(NODE.data.accessKey);
    }
    callback(messageBird);
  });
};
