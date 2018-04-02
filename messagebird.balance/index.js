'use strict';

module.exports = (NODE) => {
  const messageBirdIn = NODE.getInputByName('messagebird');
  const balanceOut = NODE.getOutputByName('balance');

  balanceOut.on('trigger', async (conn, state, callback) => {
    const messageBirds = await messageBirdIn.getValues(state);

    const balances = await Promise.all(messageBirds.map((messageBird) => {
      return new Promise((resolve, reject) => {
        messageBird.balance.read((err, data) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(data);
        })
      });
    }));

    callback(balances);
  });
};
