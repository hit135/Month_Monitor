const axios = require('axios');
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
const API_ROOT = 'http://1.223.40.19:30081/api/';

export const axiosTest = () => {
  axios.get(`${API_ROOT}` + '/hello')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.log(err)
    })
}



