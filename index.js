const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
require("dotenv").config();

var port = process.env.PORT || 8080;
var posts = [];

// Initialize Express
const app = express();

// Setting up template engine
app.set("view engine", "ejs");

// bodyParser Initialized
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Static Files Served
app.use("/public", express.static("public"));
const projects = [
  {
    id: 1,
    title: "Project One",
    description: "This is the description of Project One.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    githubLink: "https://github.com/project-one",
    liveLink: "https://project-one.live",
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is the description of Project Two.",
    features: ["Feature 1", "Feature 2"],
    githubLink: "https://github.com/project-two",
    liveLink: "https://project-two.live",
  },
];
// Home Route
// Assuming you're using Express.js
app.get("/", (req, res) => {
  // Fetch or define the projects array from your database or static data
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "This is the description of Project One.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      githubLink: "https://github.com/project-one",
      liveLink: "https://project-one.live",
    },
    {
      id: 2,
      title: "Project Two",
      description: "This is the description of Project Two.",
      features: ["Feature 1", "Feature 2"],
      githubLink: "https://github.com/project-two",
      liveLink: "https://project-two.live",
    },
  ];

  // Render the view and pass the 'projects' array to it
  res.render("home", { projects });
});

// app.get("/projects", (req, res) => {
//   const projects = [
//     // Array of projects fetched from your database
//     { title: "Project 1", description: "Description of Project 1", _id: "1" },
//     { title: "Project 2", description: "Description of Project 2", _id: "2" },
//   ];
//   res.render("projects", { projects });
// });

app.get("/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("projects", { project });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const post = {
    content: req.body.post,
    title: req.body.title,
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server Up At " + port);
});
