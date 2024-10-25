import axios from 'axios';
import { message } from 'antd';

let timer: NodeJS.Timeout | null = null;
const debounceMessage = (text: string, delay = 1000) => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    message.error(text);
    timer = null;
  }, delay);
}

const request = axios.create({
  baseURL: ROUTE_BASE,
});

request.interceptors.request.use(config => {
  return config;
}, error => {
  console.log('request error', error)
  return Promise.reject(error);
});

request.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error.response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status, data } = error.response;
    const errorText = data.message ?? '服务器发生错误';
    debounceMessage(errorText);
  } else {
    debounceMessage('请求无响应');
  }
  return Promise.reject(error);
});

export default request;
