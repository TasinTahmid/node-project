const url = require("url");
const { StringDecoder } = require('string_decoder');
const { type } = require("os");


module.exports = (req, cb) => {
    const parsedUrl = url.parse(req.url, true);
    const baseUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();

    const route = baseUrl.split("/")[2];
    const paramId = baseUrl.split("/")[3];

    const decoder = new StringDecoder('utf-8');
    let body = '';

    req.on('data', (buffer)=>{
        body += decoder.write(buffer);
    });

    req.on('end', () => {
        body += decoder.end();
        body = body && JSON.parse(body);

        cb({body, method, route, baseUrl, paramId})
    });
}

