const fs = require("fs");

const products = JSON.parse(fs.readFileSync("./modules/product/product.model.json", { encoding: 'utf8', flag: 'r' }));

const getProducts = (req, res) => {

    if(!req.paramId){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(products));
    }
    else{
        const product = products.find(product => product.id == req.paramId);

        if(!product){
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({"messege": "Product not found."}));
        }

        else{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(product));
        }
    }
    return res.end();    
}
const updateProduct = (req, res) => {
    const id = req.paramId;
    const index = products.findIndex(product => product.id == id);

    if(index == -1){
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({"messege": "Product not found."}));
        res.end();
        return;
    }
    const newProduct = {
        id: req.paramId,
        name: req.body.name,
        detail: req.body.detail,
        price: req.body.price
    }

    const updatedProducts = products.map(product => {
        if(product.id == id) return newProduct;
        return product;
    });

    fs.writeFileSync("./modules/product/product.model.json", JSON.stringify(updatedProducts));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(newProduct));
    res.end();

}
const createProduct = (req, res) => {
    const product = {
        id: 100,
        ...req.body
    };

    products.push(product);

    fs.writeFileSync("./modules/product/product.model.json", JSON.stringify(products));

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(product));
    res.end();

}
const deleteProduct = (req, res) => {
    const id = req.paramId;
    const index = products.findIndex(product => product.id == id);

    if(index == -1){
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({"messege": "Product not found."}));
        res.end();
        return;
    }
    const deletedProduct = products.splice(index, 1)[0];
    fs.writeFileSync("./modules/product/product.model.json", JSON.stringify(products));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(deletedProduct));
    res.end();    
}

module.exports = { getProducts, updateProduct, createProduct, deleteProduct};