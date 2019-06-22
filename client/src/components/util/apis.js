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
  }
};

export default api;
