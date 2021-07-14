const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬


export function getData() {
  return axios
    .post(`${API_ROOT}` + "/hello", {id: "admin"})
    .then(response => response);
}
