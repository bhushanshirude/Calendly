var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = new Schema({
    "MeetingDetails": {
        Duration: String,
        Event: String,
        Location: String,
        Link: String,
        grouptype: String,
        Destination: String,
        Country: String,
        Date: String,
        Time: String,
        Select: String
    },
    "userId": String,

}, {
    collection: "meetings"
});

module.exports = mongoose.model("meetings", Model);