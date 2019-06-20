import axios from "axios";

const api = {
  getTeams: function() {
    return axios.get("http://localhost:3001/people").then(res => res.data);
  }
  // getRandomBeer: function() {
  //   return axios
  //     .get("http://localhost:3001/beers/random")
  //     .then(res => res.data);
  // },
  // addNewBeer: function(beer) {
  //   return axios
  //     .post("http://localhost:3001/beers/new", beer)
  //     .then(res => res.data);
  // }
};

export default api;
