const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬
// const API_ROOT = 'http://1.223.40.19:30081/api/';

export const getSnsrList = (page, sizePerPage, searchItem) => {
  return axios
    .get(`${API_ROOT}/snsrs?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&areaCode=${searchItem.areaCode}&levelAreaCode=${searchItem.levelAreaCode}&delYn=${searchItem.delYn}`)
}

export const insertSnsr = (array) => {
  console.log(1234);
  return axios
    .post(`${API_ROOT}/insertSnsr`, array)
}

export const getSnsr = (id) => {
  return axios
    .post(`${API_ROOT}/selectSnsr`, { snsrId : id } )
}

export const updateSnsr = (array) => {
  return axios
    .post(`${API_ROOT}/updateSnsr`, array)
}

export const deleteSnsr = (id) => {
  return axios
    .post(`${API_ROOT}/deleteSnsr`, {snsrId : id})
}
