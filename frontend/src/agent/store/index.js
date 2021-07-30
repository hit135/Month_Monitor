const axios = require('axios');
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
const API_ROOT = 'http://1.223.40.19:30081/api/';

export const getStrList = (page, sizePerPage, searchItem) => {
  return axios
    .get(`${API_ROOT}/strs?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&useYn=${searchItem.useYn}`)
}



