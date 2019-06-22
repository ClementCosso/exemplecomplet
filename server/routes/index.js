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
  console.log("log", req.isAuthenticated());
  console.log("log", req.session);
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
    res.redirect("/rights"); //    |
  } //    |
};

//==================  routes  ==================//

router.get("/people", isAuthenticated, (req, res, next) => {
  User.find().then(users => {
    res.send(users).catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
  });
});

router.get("/projects", isAuthenticated, (req, res, next) => {
  Project.find()
    .then(projects => {
      res.send(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
});

//==================  routes  ==================//

router.get("/", isAuthenticated, (req, res, next) => {
  Calendar.find().then(calendars => {
    res.render("index", { calendars });
  });
});

router.get("/api/dashboard", isAuthenticated, isAdmin, (req, res, next) => {
  Calendar.find()
    .populate("user")
    .populate({
      path: "works.project",
      model: "Project"
    })
    .then(calendar => {
      res.send({ calendar });
    });
});

router.get("/api/projects", isAuthenticated, isAdmin, (req, res, next) => {
  Project.find().then(project => {
    res.send(project);
  });
});

router.get("/rights", isAuthenticated, (req, res, next) => {
  res.render("rights");
});

router.get("/calendar", isAuthenticated, (req, res, next) => {
  User.findOne({ _id: req.user._id }).then(user => {
    Calendar.find({ user: user._id }).then(calendars => {
      calendars.sort(function(a, b) {
        return a.week - b.week;
      });
      console.log(calendars);
      res.render("calendar", { calendars, user });
    });
  });
});

router.get("/calendar/new", isAuthenticated, (req, res, next) => {
  Project.find().then(projects => {
    res.render("newcalendar", { projects });
  });
});

router.post("/calendar/new", isAuthenticated, (req, res, next) => {
  let calendar = req.body;
  calendar.user = req.user._id;

  Calendar.create(calendar).then(_ => {
    res.redirect("/calendar");
  });
});

module.exports = router;
