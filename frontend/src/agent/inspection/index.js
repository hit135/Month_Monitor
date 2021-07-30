const axios = require('axios');
//const API_ROOT = 'http://localhost:8081/api';    // 로컬
const API_ROOT = 'http://1.223.40.19:30081/api/';

export const getInsprAreaList = () => {
  return axios.post(`${API_ROOT}/listInsprArea`);
}

export const getInspectorList = (page, size, searchItem) => {
  return axios
    .get([
        `${API_ROOT}/insprs?page=${page}`
      , `size=${size}`
      , `searchWrd=${searchItem.searchWrd}`
      , `useYn=${searchItem.useYn}`
      , `alarmUse=${searchItem.alarmUse}`
      , `loginLock=${searchItem.loginLock}`
      , `inspAreaCode=${searchItem.inspAreaCode}`
    ].join('&'));
}

export const getDupChkInspId = inspId => axios.post(`${API_ROOT}/selectDupChkInspId`, inspId);

export const insertInspector = map => axios.post(`${API_ROOT}/insertInspector`, map);



