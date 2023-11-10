const http = require("http");
const { handleReqRes } = require('./helpers/handleRequestAndResponse');

const PORT = process.env.PORT || 5000;

const server = http.createServer(handleReqRes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
