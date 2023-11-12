const controller = require('./user.controller');

module.exports = {
    'get': controller.getUsers,
    'put': controller.updateUser,
    'post': controller.createUser,
    'delete': controller.deleteUser,
};