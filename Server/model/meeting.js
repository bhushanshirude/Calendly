var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = new Schema({
    "MeetingDetails": Object,
    "userId": String,
}, {
    collation: "meetings"
});

module.exports = mongoose.model("meetings", Model);