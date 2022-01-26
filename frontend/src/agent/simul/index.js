import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const getSimulPreview = map => axios.post(`${API_ROOT}/simulPreview`, map);
export const sendSimulPush = map => axios.post(`${API_ROOT}/sendSimulPush`, map);
