import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getInsprAreaList = () => axios.post(`${API_ROOT}/listInsprArea`);


export const getInspectorList = (page, size, searchItem) =>
   axios.get([
       `${API_ROOT}/insprs?page=${page}`
     , `size=${size}`
     , `searchWrd=${searchItem.searchWrd}`
     , `useYn=${searchItem.useYn}`
     , `alarmUse=${searchItem.alarmUse}`
     , `loginLock=${searchItem.loginLock}`
     , `inspAreaCode=${searchItem.inspAreaCode}`
   ].join('&'));

export const getDupChkInspId = map => axios.post(`${API_ROOT}/selectDupChkInspId`, map);
export const insertInspector = map => axios.post(`${API_ROOT}/insertInspector`, map);
