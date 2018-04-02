'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');
  const messageBirdIn = NODE.getInputByName('messagebird');
  const messagesIn = NODE.getInputByName('messages');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const [messageBirds, messages] = await Promise.all([
      messageBirdIn.getValues(state),
      messagesIn.getValues(state)
    ]);

    await Promise.all(messageBirds.map((messageBird) => {
      return Promise.all(messages.map((message) => {
        return new Promise((resolve, reject) => {
          messageBird.messages.create(message, (err, res) => {
            if (err) {
              reject(err);
              return;
            }
  
            resolve(res);
          });
        });
      }));
    }));

    doneOut.trigger(state);
  });
};
