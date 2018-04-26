var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Model = new Schema({

        "personalDetails": Object,

    },
    // personalDetails is the object of array in mongodb
    {
        // users is the database table name.
        collection: "users"
    });
module.exports = mongoose.model("users", Model);