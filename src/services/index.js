const users = require('./users/users.service.js');
const location = require('./location/location.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(location);
};
