const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬

export const axiosTest = () => {
  axios.get(`${API_ROOT}` + '/hello')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.log(err)
    })
}



