require('ts-node/register');
const resetDB = require('../src/startup/reset-database');

module.exports = function() {
  return resetDB();
};

resetDB()
  .then(() => console.log('db reset complete'))
  .catch(err => {
    console.log(err);
    console.log('---- force exiting ----');
    process.exit(1);
  });
