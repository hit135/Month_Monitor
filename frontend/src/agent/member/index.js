const axios = require('axios');
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
const API_ROOT = 'http://1.223.40.19:30081/api/';

export const getMemList = (page, sizePerPage, searchItem) => {
  return axios
    .get(`${API_ROOT}/mems?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&useYn=${searchItem.useYn}&delYn=${searchItem.delYn}&smsYn=${searchItem.smsYn}&leaveYn=${searchItem.leaveYn}`)
}

export const insertMem = (array) => {
  return axios
    .post(`${API_ROOT}/insertMem`, array)
}

export const getMem = (id) => {
  return axios
    .post(`${API_ROOT}/selectMem`, { 'userId' : id } )
}

export const updateMem = (array) => {
  return axios
    .post(`${API_ROOT}/updateMem`, array)
}

export const deleteMem = (id) => {
  return axios
    .post(`${API_ROOT}/deleteMem`, {userId : id})
}


