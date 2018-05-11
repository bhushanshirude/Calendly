//variable Declaration 
var express = require("express");
var users = require("../controller/controller.js")
var meeting = require("../controller/meeting.js")
var invitation = require("../controller/invitation.js")
var routes = express.Router();
// this is for user
routes.post("/user", users.create);
routes.get("/user/:id", users.getone);
routes.put("/user/:id", users.update);
routes.put("/user/Email/:id", users.updatePassword);
routes.post("/user/find", users.findData);

// This is for Meeting
routes.post("/meeting", meeting.create);
routes.put("/meeting/:id", meeting.update);
// routes.put("/meeting/data/:id", meeting.updateDate);
routes.post("/meeting/find", meeting.findData);
routes.get("/meeting/getall/:id", meeting.getall);

// This is for invitation
routes.post("/invitation", invitation.create);
routes.post("/invitation/email", invitation.send);
routes.put("/invitation/:id", invitation.update);
routes.post("/invitation/find", invitation.findData);

module.exports = routes;