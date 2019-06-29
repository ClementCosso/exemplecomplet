import axios from "axios";

const ressource = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true
});

const api = {
  getTeams: function() {
    return ressource.get("/people").then(res => res.data);
  },

  addNewUser: function(user) {
    return ressource.post("/admin/users/new", user).then(res => res.data);
  },

  deleteUser: function(id) {
    return ressource
      .get(`/admin/users/archive/${id}`)
      .then(_ => {
        return Promise.resolve();
      })
      .catch(err => console.log("deleteUser", err));
  },

  editUser: function(id, data) {
    return ressource
      .post(`/admin/users/edit/${id}`, data)
      .then(res => res.data);
  },

  getUser: function(id) {
    return ressource.get(`/admin/users/edit/${id}`).then(res => res.data);
  },

  getProjects: function() {
    return ressource.get("/projects").then(res => res.data);
  },

  deleteProject: function(id) {
    return ressource
      .get(`/admin/projects/delete/${id}`)
      .then(_ => {
        return Promise.resolve();
      })
      .catch(err => console.log("deleteUser", err));
  },
  addNewProject: function(project) {
    return ressource.post("/admin/projects/new", project).then(res => res.data);
  },

  editProject: function(e) {
    return ressource.post("/admin/project/edit/", e).then(res => res.data);
  },

  getCalendars: function() {
    return ressource.get("/calendar").then(res => res.data);
  },

  deleteCalendar: function(id) {
    return ressource
      .get(`/calendar/delete/${id}`)
      .then(_ => {
        return Promise.resolve();
      })
      .catch(err => console.log("deleteCalendar", err));
  },

  addNewCalendar: function(project) {
    console.log("project", project);
    return ressource.post("/calendar/new", project).then(res => res.data);
  },
  editCalendar: function(id, project) {
    return ressource
      .post(`/calendar/edit/${id}`, project)
      .then(res => res.data);
  },

  getTimesheet: function(id) {
    return ressource.get(`/calendar/edit/${id}`).then(res => res.data);
  }
};

export default api;
