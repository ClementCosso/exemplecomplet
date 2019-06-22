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
  req.body.employee = req.body.employee == "on";
  req.body.teamleader = req.body.teamleader == "on";
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
    employee: req.body.employee,
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

//==================  routes  ==================//

// router.get("/users/edit/:id", isAuthenticated, isAdmin, (req, res, next) => {
//   User.findById(req.params.id).then(user => {
//     res.render("useredit", { user });
//   });
// });

// router.get("/users/delete/:id", isAuthenticated, isAdmin, (req, res, next) => {
//     User.deleteOne({ _id: req.params.id }).then(_ => {
//       res.redirect("/people");
//     });
//   });

router.get("/projects/new", isAuthenticated, isAdmin, (req, res, next) => {
  res.render("newproject");
});

router.post("/projects/new", isAuthenticated, isAdmin, (req, res, next) => {
  let project = req.body;
  console.log("req body", req.body);

  Project.create(project).then(_ => {
    res.redirect("/projects");
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

module.exports = router;
