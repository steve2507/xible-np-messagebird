'use strict';

module.exports = (NODE) => {
  const recipientOut = NODE.getOutputByName('recipient');
  recipientOut.on('trigger', async (conn, state) => {
    return NODE.data.recipient;
  });
};
