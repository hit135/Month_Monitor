const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬

export const getStrList = (page, sizePerPage, searchItem) => {
  return axios
    .get(`${API_ROOT}/strs?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&useYn=${searchItem.useYn}`)
}



