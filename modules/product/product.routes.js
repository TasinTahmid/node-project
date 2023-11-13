const controller = require('./product.controller');

module.exports = {
    'get': controller.getProducts,
    'put': controller.updateProduct,
    'post': controller.createProduct,
    'delete': controller.deleteProduct,
};