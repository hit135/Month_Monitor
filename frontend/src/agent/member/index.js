import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getMemList = (page, sizePerPage, searchItem) =>
  axios.get([
      `${API_ROOT}/mems?page=${page}`
    , `size=${sizePerPage}`
    , `searchWrd=${searchItem.searchWrd}`
    , `useYn=${searchItem.useYn}`
    , `delYn=${searchItem.delYn}`
    , `smsYn=${searchItem.smsYn}`
    , `leaveYn=${searchItem.leaveYn}`
  ].join('&'));

export const insertMem = array => axios.post(`${API_ROOT}/insertMem`, array);
export const getMem = id => axios.post(`${API_ROOT}/selectMem`, { userId : id });
export const getModalMemList = searchWrd => axios.get(`${API_ROOT}/modalMem?searchWrd=${searchWrd}`);
export const updateMem = array => axios.post(`${API_ROOT}/updateMem`, array);
export const deleteMem = id => axios.post(`${API_ROOT}/deleteMem`, { userId : id });
