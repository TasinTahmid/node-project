const http = require("http");
const parseRequest = require('./helpers/parse-request');
const userRouter = require('./modules/user/user.routes');
const productRouter = require('./modules/product/product.routes');
const notFoundHandler = require('./allHandlers/routeHandlers/notFoundHandler');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    parseRequest(req, (parsedReq) =>{
        console.log(parsedReq)
        switch(parsedReq.route) {
            case "users":
                userRouter[parsedReq.method](parsedReq, res);
                break;
            case "products":
                productRouter[parsedReq.method](parsedReq, res);
            break;
            default:
                notFoundHandler(parsedReq, res);
        }
    
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
