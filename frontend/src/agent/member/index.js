const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬

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

export const convertPhoneNumber = (str) => {
    str = str.replace(/[^0-9]/g, '');

    var tmp = '';
    if( str.length < 4){
      return str;
    }else if(str.length < 7){
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    }else if(str.length < 11){
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    }else{
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);
      return tmp;
    }

    return str;
}


