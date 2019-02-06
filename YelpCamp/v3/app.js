var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
    
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - Display list of all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    // res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});

// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res) {
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var newCampground = { name: name, image: image, description: desc };
    //Create a new campgrounds and save to db
    Campground.create(newCampground, function(err, newCampground) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect back to campground page
            res.redirect("/campgrounds");
        }
    });
});

// NEW - Displays the form to make a new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started!");
});
