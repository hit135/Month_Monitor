import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getSimulAreaList = () => axios.post(`${API_ROOT}/listSimulArea`);

export const getSimulList = (simulType, page, size, areaCode, regDate) =>
  axios.get([
      `${API_ROOT}/simulList?simulType=${simulType}`
    , `page=${page}`
    , `size=${size}`
    , `areaCode=${areaCode}`
    , `regDate=${regDate}`
  ].join('&'));

export const getSimulPreview = map => axios.post(`${API_ROOT}/simulPreview`, map);
