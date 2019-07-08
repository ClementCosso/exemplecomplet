const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Calendar = require("../models/Calendar");
const bcrypt = require("bcrypt");

const bcryptSalt = 10;

//==================  middlewares  ==================//

let isAuthenticated = (req, res, next) => {
  if (req.user) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/login"); //    |
  } //    |
};

let isAdmin = (req, res, next) => {
  if (req.user.administrator) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/rights"); //    |
  } //    |
};

let isLeader = (req, res, next) => {
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
      projects.sort(function(a, b) {
        // return a.created_at.localeCompare(b.created_at);
        return b.created_at - a.created_at;
      });
      res.send(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
});

router.get("/calendar", isAuthenticated, (req, res, next) => {
  User.findOne({ _id: req.user._id }).then(user => {
    Calendar.find({ user: user._id }).then(calendars => {
      calendars.sort(function(a, b) {
        return b.week - a.week;
      });
      res.send(calendars);
    });
  });
});

router.get("/calendar/delete/:id", function(req, res) {
  Calendar.findByIdAndDelete({ _id: req.params.id })
    .then(calendar => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});

//==================  routes  ==================//

router.get("/", isAuthenticated, (req, res, next) => {
  Calendar.find().then(calendars => {
    res.render("index", { calendars });
  });
});

router.get("/api/dashboard", isAuthenticated, (req, res, next) => {
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

router.get("/api/projects", isAuthenticated, (req, res, next) => {
  Project.find().then(project => {
    res.send(project);
  });
});

router.get("/rights", isAuthenticated, (req, res, next) => {
  res.render("rights");
});

router.get("/calendar/new", isAuthenticated, (req, res, next) => {
  Project.find().then(projects => {
    res.render("newcalendar", { projects });
  });
});

router.post("/calendar/new", isAuthenticated, (req, res, next) => {
  let calendar = req.body;
  calendar.user = req.user._id;
  console.log("calendar", calendar);
  Calendar.create(calendar)
    .then(calendar => {
      res.send(calendar);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
});

router.post("/calendar/edit/:id", isAuthenticated, (req, res, next) => {
  const updatedCalendar = {
    user: req.user,
    works: req.body.works,
    week: req.body.week,
    year: req.body.year
  };
  Calendar.updateOne({ _id: req.params.id }, updatedCalendar)
    .then(cal => {
      res.send(cal);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err });
    });
});

router.get("/calendar/edit/:id", (req, res, next) => {
  Calendar.findOne({ _id: req.params.id }).then(cal => {
    res.send(cal);
  });
});

router.get("/calendar/all", isAuthenticated, (req, res, next) => {
  Calendar.find().then(calendars => {
    calendars.sort(function(a, b) {
      return b.week - a.week;
    });
    res.send(calendars);
  });
});

module.exports = router;
