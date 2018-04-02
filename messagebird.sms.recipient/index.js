'use strict';

module.exports = (NODE) => {
  const recipientOut = NODE.getOutputByName('recipient');
  recipientOut.on('trigger', (conn, state, callback) => {
    callback(NODE.data.recipient);
  });
};
