import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getPushList = (type, page, size, searchWrd) =>
  axios.get(`${API_ROOT}/pushs?type=${type}&page=${page}&size=${size}&searchWrd=${searchWrd}`);


