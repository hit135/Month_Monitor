import { API_ROOT } from "../commonIndex";

const axios = require('axios');

export const sendSimulPush = () => axios.post(`${API_ROOT}/sendSimulPush`);

