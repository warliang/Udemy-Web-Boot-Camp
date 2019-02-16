var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Display list of all campgrounds
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    // res.render("campgrounds", { campgrounds: campgrounds });
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds});
        }
    });
});

// CREATE - Add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author };
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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res) {
    // find and update correrct campground
    Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect somewhere (show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res) {
   Campground.findOneAndDelete(req.params.id, function(err) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   })
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;