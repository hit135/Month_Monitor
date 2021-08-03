import {useEffect} from "react";

const axios = require('axios');
const API_ROOT = 'http://localhost:8081/api';    // 로컬
// const API_ROOT = 'http://1.223.40.19:30081/api';

export const getAreaList = () => {
  return axios
    .get(`${API_ROOT}/areas`);
}

export let dataList = [];

export const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: node.title, areaLevel: node.areaLevel });
    if (node.children) {
      generateList(node.children);
    }
  }
};

export const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export const insertAreaItem = (type, upAreaCode, areaLevel) => {
  return axios
    .post(`${API_ROOT}/insertLvAreaItem`, {type: type, upAreaCode: upAreaCode, areaLevel: areaLevel});
}

export const selectAreaItem = (areaCode) => {
  return axios
    .get(`${API_ROOT}/selectAreaItem?areaCode=${areaCode}`);
}

export const deleteAreaItem = (areaCode) => {
  return axios
    .post(`${API_ROOT}/deleteAreaItem`, {areaCode: areaCode});
}

export const updateAreaItem = (array) => {
  return axios
    .post(`${API_ROOT}/updateAreaItem`, array);
}

export const rowEvents = () => {

}
