//variable Declaration 
var express = require("express");
var users = require("../controller/controller.js")
var meeting = require("../controller/meeting.js")
var routes = express.Router();

routes.post("/user", users.create);
routes.get("/user/:id", users.getone);
routes.put("/user/:id", users.update);
routes.post("/user/find", users.findData);



routes.post("/meeting", meeting.create)
routes.put("/meeting/:id", meeting.update);
// routes.post("/meeting/:id", meeting.send)


module.exports = routes;