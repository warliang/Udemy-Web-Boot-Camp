var express = require("express");
var app = express();

// "/" => "Hi There!""
app.get("/", function(req, res) {
    res.send("Hi There");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    res.send("MEOW!");
});


// Tell express to listen to requests
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});