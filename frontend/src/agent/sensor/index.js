const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬
// const API_ROOT = 'http://1.223.40.19:30081/api/';

export const getSnsrList = (page, sizePerPage, searchItem) => {
  return axios
    .get(`${API_ROOT}/snsrs?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&areaCode=${searchItem.areaCode}&levelAreaCode=${searchItem.levelAreaCode}`)
}


