var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    seedDB              = require("./seeds"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user")

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Secret Key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

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
            res.render("campgrounds/index", { campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
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

// ================
// COMMENTS ROUTES
// ================

// New - form to create comment
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Create - create comment and add to DB
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    // lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect to campground show page
});

// ==============
// AUTH ROUTES
// ==============

// show register form
app.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// show login form
app.get("/login", function(req, res) {
    res.render("login");
});
// handle login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
        
    }), function(req, res) {
});

// logout logic route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started!");
});
