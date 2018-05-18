var invitationModel = require("../model/invitation")
var nodemailer = require("nodemailer");
var multer = require("multer")
var config = require("../config/config");

module.exports = {

    create: function(req, response) {

        var data = req.body.Mdata;
        var userdata = req.body.UData;
        var newUser = new invitationModel(req.body);
        newUser.save(function(err, docs) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, docs: '' });
                return false;
            }
            var url = config.WEBURL + "home/reschedule/" + newUser._id;
            var urls = config.WEBURL + "home/Confirm/" + newUser._id
            var msg = "<h4>Hello " + newUser.InvitationDetails.IName + ",</h4>" + "<h4>Your " + data.MeetingDetails.Event + " " + "With " + " " + userdata.FirstName + " " + userdata.LastName + " " + " On" + " " + data.MeetingDetails.Date + " " + "At " + " " + data.MeetingDetails.Time + " " + data.MeetingDetails.Select + " ," + "<br> " + data.MeetingDetails.Description + " " + "<br><br> Location : " + data.MeetingDetails.Location + "<h3>Make Change to This Event : </h3>";

            msg += "<a href='" + urls + "'><button style='margin-left:100px; background-color:#fff; color:#007bff; height:50px; border:solid 2px #007bff; width:14em; cursor:pointer;'>Confirm</button></a ><br><br><br>";
            msg += "<a href='" + url + "'><button style='margin-left:100px; background-color:#fff; color:#007bff; height:50px; border:solid 2px #007bff; width:14em; cursor:pointer;'>Reschedule</button></a ><br><br><br>";
            msg += "<a href='" + urls + "'><button style='margin-left:100px; background-color:#fff; color:rgb(179,179,179); height:50px; border:solid 2px rgb(179,179,179); width:14em; cursor:pointer;' >Cancel</button rgb(179, 179,179)></a ><br><br><br> ";
            if (sendEmail(newUser.InvitationDetails.IEmail, "Verification Email", msg)) {
                response.json({ status: "Email Error", message: "Email could not sent!" });
                return false;
            }
            response.status(200).json({ status: "Success", message: "Success", docs: docs });
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
        var data = req.body.userId;
        var udata = req.body.udata;
        var mdata = req.body.MData;
        var idata = req.body.IData;
        var reason = req.body.InvitationDetails;
        var url = config.WEBURL + "home/reschedule/" + data;
        var msg = "<h4>Hello " + udata.FirstName + " " + udata.LastName + ",</h4>" + "<h4>Your " + " " + mdata.Event + " " + "With" + " " + idata.IName + " " + "At " + " " + idata.IDate + " " + "On " + " " + idata.ITime + " " + idata.ISelect + " ,</h4>" + mdata.Description + " , <br>" + "Meeting Reschedule  : " + "<b>" + reason.Reason + "</b>" + " .<br>" + "</h4><br><b>Location</b>: Pune.<br><h3>Thanks& Regards</h3>" + idata.IName + ".";

        if (sendEmail(udata.Email, "Verification Email", msg)) {
            response.json({ status: "Email Error", message: "Email could not sent!" });
            return false;
        } else {
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
            return true;
        }
    },

    findData: function(request, response) {
        invitationModel.find(request.body, function(err, docs) {
            if (err || docs.length <= 0) {
                response.status(500).json({ status: "Error", message: err | "User does not exist", docs: '' });
                return false;
            } else {
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            }
        })
    },
    sends: function(req, response) {
        var udata = req.body.userId;
        var mdata = req.body.Mdata;
        var idata = req.body.Idata;
        var data = udata.personalDetails;
        var url = config.WEBURL + "home/reschedule/" + idata._id;
        var msg = "<h4>Hello " + idata.InvitationDetails.IName + " " + ",</h4>" + "<h4>Your " + " " + mdata.MeetingDetails.Event + " " + "With" + " " + data.FirstName + " " + data.LastName + " " + "At " + " " + idata.InvitationDetails.IDate + " " + "On " + " " + idata.InvitationDetails.ITime + " " + idata.InvitationDetails.ISelect + " ,</h4>" + mdata.MeetingDetails.Description + " Schedule " + " : " + "<b> Cancel </b>" + " .<br>" + "</h4><br><b>Location</b>: Pune.<br><h3>Thanks& Regards</h3>" + data.FirstName + " " + data.LastName + ".";
        if (sendEmail(idata.InvitationDetails.IEmail, "Verification Email", msg)) {
            response.json({ status: "Email Error", message: "Email could not sent!" });
            return false;
        } else {
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
            return true;
        }
    },

    asend: function(req, response) {
        var udata = req.body.userId;
        var mdata = req.body.Mdata;
        var idata = req.body.Idata;
        var data = udata.personalDetails;
        var url = config.WEBURL + "home/reschedule/" + idata._id;
        var msg = "<h4>Hello " + idata.InvitationDetails.IName + " " + ",</h4>" + "<h4>Your " + " " + mdata.MeetingDetails.Event + " " + "With" + " " + data.FirstName + " " + data.LastName + " " + "At " + " " + idata.InvitationDetails.IDate + " " + "On " + " " + idata.InvitationDetails.ITime + " " + idata.InvitationDetails.ISelect + " ,</h4>" + mdata.MeetingDetails.Description + " Schedule " + " : " + "<b> Accept </b>" + " .<br>" + "</h4><br><b>Location</b>: Pune.<br><h3>Thanks& Regards</h3>" + data.FirstName + " " + data.LastName + ".";
        if (sendEmail(idata.InvitationDetails.IEmail, "Verification Email", msg)) {
            response.json({ status: "Email Error", message: "Email could not sent!" });
            return false;
        } else {
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
            return true;
        }
    },
    updates: function(request, response) {
        let Data = request.body.InvitationDetails;
        let id = request.body.id;
        invitationModel.findByIdAndUpdate(request.body.id, {
                $set: {
                    'InvitationDetails.Reason': Data.Reason
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
    Consend: function(req, response) {
        var data = req.body.userId;
        var udata = req.body.udata;
        var mdata = req.body.MData;
        var idata = req.body.IData;
        var reason = req.body.InvitationDetails;
        var url = config.WEBURL + "home/reschedule/" + data;
        var msg = "<h4>Hello " + udata.FirstName + " " + udata.LastName + ",</h4>" + "<h4>Your " + " " + mdata.Event + " " + "With" + " " + idata.IName + " " + "At " + " " + mdata.Date + " " + "On " + " " + mdata.Time + " " + mdata.Select + " ,</h4>" + mdata.Description + " , <br>" + "Meeting Reschedule  : " + "<b>" + reason.Reason + "</b>" + " .<br>" + "</h4><br><b>Location</b>: Pune.<br><h3>Thanks& Regards</h3>" + idata.IName + ".";

        if (sendEmail(udata.Email, "Verification Email", msg)) {
            response.json({ status: "Email Error", message: "Email could not sent!" });
            return false;
        } else {
            response.status(200).json({ status: "Success", message: "Success", docs: '' });
            return true;
        }
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