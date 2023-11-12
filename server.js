const http = require("http");
const parseRequest = require('./helpers/parse-request');
const userRouter = require('./modules/user/user.routes');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    parseRequest(req, (parsedReq) =>{

        switch(parsedReq.route) {
            case "users":
                (userRouter[parsedReq.method])(parsedReq, res);
                break;
            case products:
              // code block
              break;
            default:
              // code block
          }
    
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
