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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getSnsruList = (page, sizePerPage) => axios.get(`${API_ROOT}/snsrus?page=${page}&size=${sizePerPage}`);
export const insertSnsru = array => axios.post(`${API_ROOT}/insertSnsru`, array);
export const getSnsru = seq => axios.post(`${API_ROOT}/selectSnsru`, seq);
export const updateSnsru = array => axios.post(`${API_ROOT}/updateSnsru`, array);
export const deleteSnsru = seq => axios.post(`${API_ROOT}/deleteSnsru`, seq);
