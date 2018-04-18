// *********Package Declare************
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("./config/config");
var router = require("./route/routes");
var fileupload = require("express-fileupload")

// for email verification
var exphbs = require('express-handlebars');


var url = 'http://localhost:8080/verify'
    // ****app initialization****
var app = express();

// Only needed if you don't have a real mail account for testing

app.all("/*", function(response, response, next) {

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (response.method == "OPTIONS")
        response.status(200).end();

    next();
})

app.use(bodyParser.json());
app.use(fileupload());
app.use("/profile", express.static("uploads/profile"));
/**** Setting up route ****/

app.use("/", router);

// If Invalid page is passed...
app.use(function(request, response) {
    response.status(404).send("Page Not Found!");
});

// Setting up Database!
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/calendly', { useMongoClient: true }, function(err) {
    if (err) {
        console.log("Error Connecting Database! " + err);
    } else {
        console.log("Database Connected!");
    }
})

//******setting up Server*******
app.set("8080", config.port);
var server = app.listen(app.get(config.port), function() {
    var port = server.address().port;
    console.log("Server is running on port " + port);
});