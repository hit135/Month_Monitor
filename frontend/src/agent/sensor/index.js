import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getSnsrList = (page, sizePerPage, searchItem) =>
   axios.get([
       `${API_ROOT}/snsrs?page=${page}`
     , `size=${sizePerPage}`
     , `searchWrd=${searchItem.searchWrd}`
     , `areaCode=${searchItem.areaCode}`
     , `levelAreaCode=${searchItem.levelAreaCode}`
     , `delYn=${searchItem.delYn}`
   ].join('&'));

export const insertSnsr = array => axios.post(`${API_ROOT}/insertSnsr`, array);
export const getSnsr = id => axios.post(`${API_ROOT}/selectSnsr`, { snsrId: id });
export const updateSnsr = array => axios.post(`${API_ROOT}/updateSnsr`, array);
export const deleteSnsr = id => axios.post(`${API_ROOT}/deleteSnsr`, { snsrId: id });
