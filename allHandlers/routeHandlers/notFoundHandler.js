module.exports = (req, res) => {

    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({"messege": "Bad request"}));
    res.end();

}