// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/USer");
const Project = require("../models/Project");
const Calendar = require("../models/Calendar");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/REACTtimesheets", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = require("./seed_users");

let projects = require("./seed_projects");

let calendars = require("./seed_calendars");

User.deleteMany()
  .then(() => {
    return Project.deleteMany();
  })
  .then(() => {
    return Calendar.deleteMany();
  })
  .then(() => {
    return Promise.all([User.create(users), Project.create(projects)]);
  })
  .then(results => {
    let created_users = results[0];
    let created_projects = results[1];
    calendars.forEach(cal => {
      cal.user = created_users[cal.user]._id;
      cal.works.forEach(
        work => (work.project = created_projects[work.project]._id)
      );
    });
    return Calendar.create(calendars);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
