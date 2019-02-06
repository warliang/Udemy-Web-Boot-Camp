var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require("./models/post");
var User = require("./models/user")

// CREATE A POST AND ADD IT TO A USER WITH ONLY THE REFERENCE ID
Post.create({
    title: "How to cook the best burger part 4",
    content: "FHDILKSFHJSDKL"
}, function(err, post) {
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
      if (err) {
          console.log(err);
      } else {
          foundUser.posts.push(post);
          foundUser.save(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(data);
              }
          });
      }
    });
});

// FIND USER
// FIND ALL POSTS FOR THAT USER
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });