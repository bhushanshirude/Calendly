//variable Declaration 
var express = require("express");
var users = require("../controller/controller.js")
var meeting = require("../controller/meeting.js")
var invitation = require("../controller/invitation.js")
var routes = express.Router();
// this is for user
routes.post("/user", users.create);
routes.get("/user/:id", users.getone);
routes.put("/user/Email/:id", users.updatePassword);
routes.post("/user/find", users.findData);

// This is for Meeting
routes.post("/meeting", meeting.create);
routes.put("/meeting/:id", meeting.update);
routes.post("/meeting/find", meeting.findData);
routes.get("/meeting/getall/:id", meeting.getall);
routes.delete("/meeting/:id", meeting.remove);
routes.put("/meetings/:id", meeting.updates);

// This is for invitation
routes.post("/invitation", invitation.create);
routes.post("/invitation/email", invitation.send);
routes.post("/invitation/emails", invitation.sends);
routes.post("/invitation/accept", invitation.asend);
routes.put("/invitation/:id", invitation.update);
routes.post("/invitation/find", invitation.findData);
routes.post("/invitation/:_id", invitation.updates)

module.exports = routes;