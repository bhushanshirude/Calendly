var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = new Schema({
    "InvitationDetails": {
        IName: String,
        IEmail: String,
        IDate: String,
        ISelect: String,
        ITime: String,
        Reason: String,
    },
    "UserId": String,
    "MId": String
}, {
    collection: "invitaions"
});

module.exports = mongoose.model("invitaions", Model);