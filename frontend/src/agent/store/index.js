import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getStrList = (page, sizePerPage, searchItem) =>
  axios.get(`${API_ROOT}/strs?page=${page}&size=${sizePerPage}&searchWrd=${searchItem.searchWrd}&useYn=${searchItem.useYn}&areaCode=${searchItem.areaCode}`)

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const insertStr = array => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(array))
    if (["strPosLat", "strPosLon"].indexOf(key) > -1)
      formData.append(key, (value === null) ? 0.0 : value.toString());
    else if (key === "files" && value)
      value.map((item, idx) => formData.append("files", item));
    else
      formData.append(key, value.toString());

  return axios({
      method: "post"
    , url: `${API_ROOT}/insertStr`
    , data: formData
    , headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getStr = (array) => axios.post(`${API_ROOT}/selectStr`, array);

export const updateStr = (array) => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(array))
    if (["strPosLat", "strPosLon"].indexOf(key) > -1)
      formData.append(key, (value === null) ? 0.0 : value.toString());
    else if (key === "files" && value)
      value.map((item, idx) => formData.append("files", item));
    else if (key === "deleteFileList" && value)
      formData.append(key, value);
    else
      formData.append(key, value.toString());

  return axios({
      method: "post"
    , url: `${API_ROOT}/updateStr`
    , data: formData
    , headers: { "Content-Type": "multipart/form-data" }
  });
};

export const deleteStr = (strCode, areaCode, levelAreaCode, files) => {
  let formData = new FormData();
  formData.append("strCode", strCode);
  formData.append("areaCode", areaCode);
  formData.append("levelAreaCode", levelAreaCode);

  if (files)
    files.map((item, idx) => formData.append("files", item));

  return axios({
      method: "post"
    , url : `${API_ROOT}/deleteStr`
    , data: formData
    , headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getModalStrList = searchWrd => axios.get(`${API_ROOT}/modalStr?searchWrd=${searchWrd}`);




