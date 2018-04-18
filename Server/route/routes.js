//variable Declaration 
var express = require("express");
var users = require("../controller/controller.js")
var routes = express.Router();

routes.post("/user", users.create);
routes.get("/user/:id", users.getone);
routes.put("/user/:id", users.update);
routes.post("/user/find", users.findData);

// routes.post("/user/finds", users.findDatas);
// routes.get("/users", users.getall);
// routes.post('/user/send/:id', users.send);

module.exports = routes;