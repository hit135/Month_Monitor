import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getPushList = (type, page, size, startDate, endDate, searchWrd, isSuccess) =>
  axios.get([
    `${API_ROOT}/pushs?type=${type}`
    , `page=${page}`
    , `size=${size}`
    , `startDate=${startDate}`
    , `endDate=${endDate}`
    , `searchWrd=${searchWrd}`
    , `isSuccess=${isSuccess}`
  ].join('&'));


