var invitationModel = require("../model/invitation")
var nodemailer = require("nodemailer");
var multer = require("multer")
var config = require("../config/config");

module.exports = {
    create: function(request, response) {
        var newUser = new invitationModel(request.body);
        newUser.save({ $set: request.body },
            function(err, docs) {
                console.log("============body===========", request.body)
                if (err) {
                    response.status(500).json({ status: "Error", message: err, docs: '' });
                    return false;
                }
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            })
    },
    // send: function(request, response) {
    //     // console.log("==============Status===============", request.params.id)
    //     invitationModel.findOne({ _id: request.params.id },
    //         function(err, doc) {
    //             if (err || !doc) {
    //                 response.status(500).json({ status: "Error", message: err | "User does not exist", docs: '' });
    //                 return false;
    //             }
    //             // if user found
    //             var email = doc.personalDetails.Email;
    //             var url = config.WEBURL;
    //             var msg = "Hello " + doc.personalDetails.FirstName + ", you are select in second round you can Accept or Reject Invitation of second Round.<br>";
    //             msg += "<a href='" + url + "'>Accpet</a> <br>";
    //             msg += "<a href='" + url + "'>Reject</a> <br>";
    //             if (sendEmail(email, "status", msg)) {
    //                 response.status(500).json({ status: "Error", message: "Mail count not be sent! Please try after some time", docs: "" });
    //                 return false;
    //             }
    //             response.status(200).json({ status: "Ok", message: "Mail has been sent!", docs: "" });
    //         })
    // },
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