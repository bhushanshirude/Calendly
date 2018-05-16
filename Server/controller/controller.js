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
        Model.find(request.body, function(err, docs) {
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

    // update: function(request, response) {
    //     let Data = request.body.personalDetails;
    //     Model.findByIdAndUpdate(request.params.id, {
    //             $set: { 'personalDetails.Date': Data.Date, 'personalDetails.Time': Data.Time, 'personalDetails.Select': Data.Select, }
    //         },
    //         function(err, docs) {
    //             if (err) {
    //                 response.status(500).json({ status: "Error", message: err, docs: '' });
    //                 return false;
    //             } else {
    //                 response.status(200).json({ status: "Success", message: "Success", docs: docs });
    //                 return true;
    //             }
    //         });
    // },
    updatePassword: function(request, response) {
        let Data = request.body.personalDetails;
        Model.findByIdAndUpdate(request.params.id, {
                $set: { 'personalDetails.Password': Data.Password }
            },
            function(err, docs) {
                if (err) {
                    response.status(500).json({ status: "Error", message: err, docs: '' });
                    return false;
                } else {
                    response.status(200).json({ status: "Success", message: "Success", docs: docs });
                    return true;
                }
            });
    },
}

function sendEmail(to, sub, msg) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'projectfinal81@gmail.com',
            pass: 'project1'
        }
    });
    var mailOptions = {
        from: 'projectfinal81@gmail.com',
        to: to,
        subject: sub,
        html: msg
    };

    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            return false;
        }
        return true;
    });
}