var Model = require("../model/model");
var nodemailer = require('nodemailer');
var multer = require("multer");
var upload = multer({ dest: 'uploads' });
var config = require("../config/config");

module.exports = {

    getone: function(request, response) {
        Model.findOne({ "_id": request.params.id }, function(err, docs) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, docs: '' });
                return false;
            }
            response.status(200).json({ status: "Success", message: "Success", docs: docs });
        })
    },
    findData: function(request, response) {
        // console.log("=======findData======", request.body);
        Model.find(request.body, function(err, docs) {
            // console.log("========== Find Result =====", docs);
            if (err || docs.length <= 0) {
                response.status(500).json({ status: "Error", message: err | "User does not exist", docs: '' });
                return false;
            } else {
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            }
        })
    },

    create: function(req, response) {

        var newUser = new Model(req.body);

        newUser.save(function(err) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, docs: '' });
                return false;
            }
            var url = config.WEBURL + "home/verify/" + newUser._id;

            var msg = "Hello " + newUser.personalDetails.FirstName + " " + newUser.personalDetails.LastName + ", Here is your verification link.";

            msg += "<a href='" + url + "'>Verify</a > Create Password Thank you.";

            if (sendEmail(newUser.personalDetails.Email, "Verification Email", msg)) {
                response.json({ status: "Email Error", message: "Email could not sent!" });
                return false;
            }
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
        });
    },

    update: function(request, response) {
        // console.log("======update========", request.params.id);
        Model.findByIdAndUpdate(request.params.id, { $set: request.body },
            function(err, docs) {
                if (err) {
                    response.status(500).json({ status: "Error", message: err, docs: '' });
                    return false;
                }
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            })
    },
}