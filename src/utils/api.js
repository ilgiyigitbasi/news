import axios from 'axios';

import { host } from '@/utils/constants';


const axiosClient = axios.create({
  baseURL: host,
  headers: {
    'X-Api-Key':'c74c90228fec490d8b35c3e532e0649a'
  },
});

export default axiosClient;
