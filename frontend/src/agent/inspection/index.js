const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬

export const getInspectorList = (page, size, searchItem) => {
  return axios
    .get([
        `${API_ROOT}/insprs?page=${page}`
      , `size=${size}`
      , `searchWrd=${searchItem.searchWrd}`
      , `useYn=${searchItem.useYn}`
      , `alarmUse=${searchItem.alarmUse}`
      , `loginLock=${searchItem.loginLock}`
      , `inspAreaCode=${searchItem.inspAreaCode}`
    ].join('&'));
}


export const axiosTest = () => {
  axios.get(`${API_ROOT}` + '/hello')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.log(err)
    })
}



