import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const axiosTest = () =>
  axios.get(`${API_ROOT}` + '/hello')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.log(err)
    });



