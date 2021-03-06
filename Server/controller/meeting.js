var meetingModel = require("../model/meeting")
var nodemailer = require("nodemailer");
var multer = require("multer")
var config = require("../config/config");

module.exports = {
    create: function(request, response) {
        var newUser = new meetingModel(request.body);
        newUser.save({ $set: request.body },
            function(err, docs) {
                if (err) {
                    response.status(500).json({ status: "Error", message: err, docs: '' });
                    return false;
                }
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            })
    },

    update: function(request, response) {
        meetingModel.findByIdAndUpdate(request.params.id, { $set: request.body },
            function(err, docs) {
                if (err) {
                    response.status(500).json({ status: "Error", message: err, docs: '' });
                    return false;
                }
                response.status(200).json({ status: "Success", message: "Success", docs: docs })
            })
    },

    findData: function(request, response) {
        meetingModel.find(request.body, function(err, docs) {
            if (err || docs.length <= 0) {
                response.status(500).json({ status: "Error", message: err | "User does not exist", docs: '' });
                return false;
            } else {
                response.status(200).json({ status: "Success", message: "Success", docs: docs });
            }
        })
    },

    getall: function(request, response) {

        meetingModel.findOne({ _id: request.params.id }, function(err, data) {
            if (err)
                response.status(500).json({ status: "Error", message: "Error " + err, data: '' })

            else
                response.status(200).json({ status: "Success", message: "Success", data: data })
        })
    },

    remove: function(request, response) {

        meetingModel.findByIdAndRemove(request.params.id, function(err, data) {
            if (err) {
                response.status(500).json({ status: "Error", message: err, data: '' });
            }
            response.status(200).json({ status: "Success", message: "Success", data: data });
        })
    },
    updates: function(request, response) {
        let Data = request.body.MeetingDetails;
        meetingModel.findByIdAndUpdate(request.params.id, {
                $set: {
                    'MeetingDetails.Select': Data.Select,
                    'MeetingDetails.Date': Data.Date,
                    'MeetingDetails.Time': Data.Time
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
    }
}