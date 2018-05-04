var invitationModel = require("../model/invitation")
var nodemailer = require("nodemailer");
var multer = require("multer")
var config = require("../config/config");

module.exports = {
    create: function(req, response) {

        var newUser = new invitationModel(req.body);

        newUser.save(function(err) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, docs: '' });
                return false;
            }
            var url = config.WEBURL + "home/reschedule/" + newUser._id;

            var msg = "Hello " + newUser.InvitationDetails.Sname + " ," + "<br> Your Numnu With Bhushan at 09.00.00 Am On May 9,2018 is Schedule<br><br> Veritask <br> <b> Location</b>: Pune.<br>";

            msg += "<a href='" + url + "'>Reschedule</a >";
            msg += "<a href='" + url + "'>Cancel</a > ";

            if (sendEmail(newUser.InvitationDetails.Semail, "Verification Email", msg)) {
                response.json({ status: "Email Error", message: "Email could not sent!" });
                return false;
            }
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
        });
    },
    getone: function(request, response) {
        invitationModel.findOne({ "_id": request.params.id }, function(err, docs) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, docs: '' });
                return false;
            }
            response.status(200).json({ status: "Success", message: "Success", docs: docs });
        })
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