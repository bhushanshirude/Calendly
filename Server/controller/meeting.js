var Model = require("../Model/meeting")
var nodemailer = require("nodemailer");
var multer = require("multer")
var config = require("../config/config");

module.exports = {
    update: function(request, response) {
        var newUser = new Model(request.body);
        newUser.save({ $set: request.body },

            function(err, docs) {
                console.log("============body===========", request.body)
                if (err) {
                    response.status(500).json({ status: "Error", message: err, docs: '' });
                    return false;
                }
                response.status(200).json({ status: "Success", message: "Success", docs: '' });
            })
    }
}