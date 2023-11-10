const url = require("url");
const { StringDecoder } = require('string_decoder');
const routes = require("../routes");
const notFoundHandler = require('../allHandlers/routeHandlers/notFoundHandler');
const { type } = require("os");


const handler = {};

handler.handleReqRes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const baseUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();

    const decoder = new StringDecoder('utf-8');
    let data = '';

    const chosenHandler = routes[baseUrl] ? routes[baseUrl] : notFoundHandler;

    req.on('data', (buffer)=>{
        data += decoder.write(buffer);
    });

    req.on('end', () => {
        data += decoder.end();
        console.log("one")

        chosenHandler({baseUrl, method}, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
            const stringPayload = JSON.stringify(payload);
    
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            console.log("three", typeof stringPayload)
            return res.end(stringPayload);
        });
        console.log("four")
    });

}

module.exports = handler;