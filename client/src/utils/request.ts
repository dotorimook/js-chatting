import axios, { AxiosResponse } from 'axios';
import config from 'config';
import store from 'store';

const instance = axios.create({
  baseURL:config.host,
  timeout:-1,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: function (status) {
  return status >= 200 && status < 300; // default
  },
});

instance.interceptors.request.use((config:any) => {
  store.loading.isLoading = true;
  return config;
});

instance.interceptors.response.use((response:AxiosResponse<any>) => {
  store.loading.isLoading = false;
  return response;
}, (err:any) => {
  return Promise.reject(err);
});

interface IRequestOptions {
  method: 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | string;
  url: string;
  data?: any;
  param?: any;
  ignoreError?: boolean;
  headers?: any
  [key:string]:any;
}

const request = (options: IRequestOptions | any) => {
  const onSuccess = (response:AxiosResponse<any>):any => {
    return response.data;
  }

  const onError = (err:any) => {
    // handleError(err);
    store.loading.isLoading = false;
    if(!options.ignoreError) {
      store.error.visible = true;
      if(!err.response || !err.response.data || !err.response.data.message)
        store.error.msg = '알 수 없는 에러입니다.';
      else
        store.error.msg = err.response.data.message;
      if(!!err.response && err.response.status === 400){
        store.loginInfo.logout();
      }
    }
    throw err;
  }

  return instance(options)
  .then(onSuccess)
  .catch(onError);
}

export default request;