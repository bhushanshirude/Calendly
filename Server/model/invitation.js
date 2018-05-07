var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = new Schema({
    "InvitationDetails": Object,
    "UserId": String,
}, {
    collection: "invitaions"
});

module.exports = mongoose.model("invitaions", Model);