const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });
const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);



const homeStartingContent = " You don't write because you want to say something... you write because you have something to say..";
const aboutContent = "Hi, I am Naman. I'm currently a 3rd year undergraduate student in IIT Bhubaneswar. My branch is Electronics and Communication Engineering.This is a simple web-application to keep to store daily blog posts. "

const contactContent = "";

const app = express();

// let posts = [];  
//  posts contain objects post : {title : ..... , content: .....}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(express.static(""));



app.get("/", function(req, res) {

    Post.find({}, function(err, posts) {
        res.render("home", {
            StartingContent: homeStartingContent,
            posts: posts
        });
    });

});

app.get("/posts/:postId", function(req, res) {
    let requestedPostId = req.params.postId;
    console.log(requestedPostId);
    Post.findOne({ _id: requestedPostId }, function(err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });


});

app.get("/about", function(req, res) {
    res.render("about", { StartingContent: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { StartingContent: contactContent });
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save(function(err) {
        if (!err) {
            res.redirect("/");
        } else {
            console.log(err);
        }
    });

});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});