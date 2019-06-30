const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Calendar = require("../models/Calendar");
const bcrypt = require("bcrypt");

const bcryptSalt = 10;

//==================  middlewares  ==================//

let isAuthenticated = (req, res, next) => {
  console.log("log", req.user);
  if (req.user) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/login"); //    |
  } //    |
};

let isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.administrator) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/rights"); //    |
  } //    |
};

let isLeader = (req, res, next) => {
  console.log(req.user);
  if (req.user.teamleader) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/"); //    |
  } //    |
};

//==================  routes  ==================//

router.post("/users/new", isAuthenticated, isAdmin, (req, res, next) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(bcryptSalt)
  );
  req.body.freelance = req.body.freelance == "on";
  req.body.administrator = req.body.administrator == "on";
  let user = req.body;
  User.create(user).then(_ => {
    res.send("ok");
  });
});

router.get("/users/archive/:id", isAuthenticated, isAdmin, (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { $set: { hidden: true } }).then(
    usr => {
      res.send("ok");
    }
  );
});

router.post("/users/edit/:id", isAuthenticated, isAdmin, (req, res, next) => {
  const updatedUser = {
    username: req.body.username,
    email: req.body.email,
    quote: req.body.quote,
    avatar: req.body.avatar,
    image: req.body.image,
    administrator: req.body.administrator,
    teamleader: req.body.teamleader,
    freelance: req.body.freelance,
    role: req.body.role
  };
  User.updateOne({ _id: req.params.id }, updatedUser)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
});

router.get("/users/edit/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

router.get("/projects/delete/:id", function(req, res) {
  Project.findByIdAndDelete({ _id: req.params.id })
    .then(project => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/projects/new", isAuthenticated, isAdmin, (req, res, next) => {
  let project = req.body;
  console.log("req body", req.body);
  Project.create(project).then(_ => {
    res.send("yes");
  });
});

router.post("/project/edit/", isAuthenticated, isAdmin, (req, res, next) => {
  const updatedProject = {
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner,
    id: req.body.id
  };
  console.log(updatedProject);
  console.log(req.body.id);
  Project.findOneAndUpdate({ _id: req.body.id }, updatedProject)
    .then(project => {
      res.status(200).send(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
});

//==================  routes  ==================//

router.get("/projects/new", isAuthenticated, isAdmin, (req, res, next) => {
  res.render("newproject");
});

module.exports = router;
