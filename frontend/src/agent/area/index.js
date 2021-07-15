import {useEffect} from "react";

const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬

export const getAreaList = (page, sizePerPage, values = {searchWrd : "", useYn : "", delYn : ""}) => {
  return axios
    .get(`${API_ROOT}/areas?page=${page}&size=${sizePerPage}&searchWrd=${values.searchWrd}&useYn=${values.useYn}&delYn=${values.delYn}`)
    .then(response => response);
}

// 행 클릭 시
export const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(row);
  }
};
