var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = new Schema({
    "InvitationDetails": Object,
    "UserId": String,
}, {
    collation: "invitaions"
});

module.exports = mongoose.model("invitaions", Model);