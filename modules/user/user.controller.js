const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./modules/user/user.model.json", { encoding: 'utf8', flag: 'r' }));

const getUsers = (req, res) => {

    if(!req.paramId){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(users));
    }
    else{
        const user = users.find(user => user.id == req.paramId);

        if(!user){
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({"messege": "User not found."}));
        }

        else{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(user));
        }
    }
    return res.end();    
}
const updateUser = (req, res) => {
    const id = req.paramId;
    const index = users.findIndex(user => user.id == id);

    if(index == -1){
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({"messege": "User not found."}));
        res.end();
        return;
    }
    const newUser = {
        id: req.paramId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }

    const updatedUsers = users.map(user => {
        if(user.id == id) return newUser;
        return user;
    });

    fs.writeFileSync("./modules/user/user.model.json", JSON.stringify(updatedUsers));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(newUser));
    res.end();

}
const createUser = (req, res) => {
    const user = {
        id: 100,
        ...req.body
    };

    users.push(user);

    fs.writeFileSync("./modules/user/user.model.json", JSON.stringify(users));

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(user));
    res.end();

}
const deleteUser = (req, res) => {
    const id = req.paramId;
    const index = users.findIndex(user => user.id == id);

    if(index == -1){
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({"messege": "User not found."}));
        res.end();
        return;
    }
    const deletedUser = users.splice(index, 1)[0];
    fs.writeFileSync("./modules/user/user.model.json", JSON.stringify(users));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(deletedUser));
    res.end();    
}

module.exports = { getUsers, updateUser, createUser, deleteUser};