const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬


export function getAreaList(page = 1, sizePerPage = 15, values = {searchWrd : "", useYn : "", delYn : ""}) {
  return axios
    .get(`${API_ROOT}/areas?page=${page}&size=${sizePerPage}&searchWrd=${values.searchWrd}&useYn=${values.useYn}&delYn=${values.delYn}`)
    .then(response => response);
}
