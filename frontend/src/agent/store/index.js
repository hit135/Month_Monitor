const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬
// const API_ROOT = 'http://1.223.40.19:30081/api/';

export const getStrList = (page, sizePerPage, searchItem) => {
  return axios
    .get(`${API_ROOT}/strs?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&useYn=${searchItem.useYn}&areaCode=${searchItem.areaCode}`)
}
const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const insertStr = (array) => {
  let formData = new FormData();
  formData.append("strName", array["strName"]);
  formData.append("areaCode", array["areaCode"]);
  formData.append("strTel", array["strTel"]);
  formData.append("strOwnTel", array["strOwnTel"]);
  formData.append("strPosLat", (array["strPosLat"] === null) ? 0.0 : array["strPosLat"]);
  formData.append("strPosLon", (array["strPosLon"] === null) ? 0.0 : array["strPosLon"]);
  formData.append("strAddr", array["strAddr"]);
  formData.append("levelAreaCode", array["levelAreaCode"]);
  formData.append("useYn", array["useYn"]);
  if(array["files"]) {
    array["files"].map(function(item, idx) {
      formData.append("files", item);
    });
  }

  return  axios({
    method: "post",
    url: `${API_ROOT}/insertStr`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const getStr = (array) => {
  return axios
    .post(`${API_ROOT}/selectStr`, array)
}

export const updateStr = (array) => {
  let formData = new FormData();
  formData.append("strCode", array["strCode"]);
  formData.append("modifyStrCode", array["modifyStrCode"]);
  formData.append("strName", array["strName"]);
  formData.append("areaCode", array["areaCode"]);
  formData.append("strTel", array["strTel"]);
  formData.append("strOwnTel", array["strOwnTel"]);
  formData.append("strPosLat", (array["strPosLat"] === null) ? 0.0 : array["strPosLat"]);
  formData.append("strPosLon", (array["strPosLon"] === null) ? 0.0 : array["strPosLon"]);
  formData.append("strAddr", array["strAddr"]);
  formData.append("levelAreaCode", array["levelAreaCode"]);
  formData.append("useYn", array["useYn"]);
  if(array["files"]) {
    array["files"].map(function(item, idx) {
      formData.append("files", item);
    });
  }
  if(array["deleteFileList"]) {
    formData.append("deleteFileList", array["deleteFileList"]);
  }

  return  axios({
    method: "post",
    url: `${API_ROOT}/updateStr`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const deleteStr = (strCode, areaCode, levelAreaCode, files) => {
  let formData = new FormData();
  formData.append("strCode", strCode);
  formData.append("areaCode", areaCode);
  formData.append("levelAreaCode", levelAreaCode);
  if(files) {
    files.map(function(item, idx) {
      formData.append("files", item);
    });
  }

  return axios({
    method: "post",
    url : `${API_ROOT}/deleteStr`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}




