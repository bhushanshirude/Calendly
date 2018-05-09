var invitationModel = require("../model/invitation")
var nodemailer = require("nodemailer");
var multer = require("multer")
var config = require("../config/config");

module.exports = {

    create: function(req, response) {

        var newUser = new invitationModel(req.body);
        newUser.save(function(err, docs) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, docs: '' });
                return false;
            }
            var url = config.WEBURL + "home/reschedule/" + newUser._id;

            var msg = "<h4>Hello " + newUser.InvitationDetails.IName + ",</h4>" + "<h4>Your Numnu With Bhushan at 09.00.00 Am On May 9,2018 is Schedule<br><br> Veritask </h4><br><b>Location</b>: Pune.<br><br><h3>Make Change to This Event : </h3>";

            msg += "<a href='" + url + "'><button style='margin-left:100px; background-color:#fff; color:#007bff; height:50px; border:solid 2px #007bff; width:14em; cursor:pointer;'>Reschedule</button></a ><br><br><br>";
            msg += "<a href='" + url + "'><button style='margin-left:100px; background-color:#fff; color:rgb(179,179,179); height:50px; border:solid 2px rgb(179,179,179); width:14em; cursor:pointer;' >Cancel</button rgb(179, 179,179)></a > ";

            if (sendEmail(newUser.InvitationDetails.IEmail, "Verification Email", msg)) {
                response.json({ status: "Email Error", message: "Email could not sent!" });
                return false;
            }
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
        });
    },
    update: function(request, response) {
        let Data = request.body.InvitationDetails;
        invitationModel.findByIdAndUpdate(request.params.id, {
                $set: {
                    'InvitationDetails.ISelect': Data.ISelect,
                    'InvitationDetails.ITime': Data.ITime,
                    'InvitationDetails.IDate': Data.IDate,
                }
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

    send: function(req, response) {
        var data = req.body;
        var url = config.WEBURL + "home/reschedule/" + data.userId;
        var msg = "<h4>Hello " + data.firstname + data.lastname + ",</h4>" + "<h4>Your Numnu With" + " " + data.IName + " " + "At " + " " + data.IDate + " " + "On " + " " + data.ITime + " " + data.ISelect + ",</h4><br> Veritask </h4><br><br><b>Location</b>: Pune.<br><br><h3>Make Change to This Event : </h3>";

        msg += "<a href='" + url + "'><button style='margin-left:100px; background-color:#fff; color:#007bff; height:50px; border:solid 2px #007bff; width:14em; cursor:pointer;'>Reschedule</button></a ><br><br><br>";
        msg += "<a href='" + url + "'><button style='margin-left:100px; background-color:#fff; color:rgb(179,179,179); height:50px; border:solid 2px rgb(179,179,179); width:14em; cursor:pointer;' >Cancel</button rgb(179, 179,179)></a > ";

        if (sendEmail(data.email, "Verification Email", msg)) {
            response.json({ status: "Email Error", message: "Email could not sent!" });
            return false;
        }
        response.status(200).json({ status: "Success", message: "Success", docs: '' });
    },

    findData: function(request, response) {
        invitationModel.find(request.body, function(err, docs) {
            // console.log("========== Find Result =====", docs);
            if (err || docs.length <= 0) {
                response.status(500).json({ status: "Error", message: err | "User does not exist", docs: '' });
                return false;
            } else {
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            }
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