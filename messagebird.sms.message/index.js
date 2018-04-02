'use strict';

module.exports = (NODE) => {
  const recipientsIn = NODE.getInputByName('recipients');
  const bodiesIn = NODE.getInputByName('bodies');

  const messagesOut = NODE.getOutputByName('messages');
  messagesOut.on('trigger', async (conn, state, callback) => {
    const bodies = await bodiesIn.getValues(state);
    if (!bodies.length) {
      bodies.push(NODE.data.body);
    }

    const originator = NODE.data.originator;

    const recipients = await recipientsIn.getValues(state);
    if (!recipients.length) {
      recipients.push(NODE.data.recipient);
    }

    const messages = bodies.map((body) => ({
      originator,
      body,
      recipients
    }));

    callback(messages);
  });
};
