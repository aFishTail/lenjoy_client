import axios from 'axios';
import Router from 'next/router';
import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast()
const toastErrorMsg = (msg: string) => {
  toast({
    title: msg,
    status: 'error',
    position: 'top'
  })
}

export const httpProvider = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

httpProvider.interceptors.request.use(
  (config) => {
    console.log('request config', config)

    return config;
  },

  () => {
    throw new Error('发起请求出错');
  }
);

httpProvider.interceptors.response.use(
  (data) => {
    // if (data.status && +data.status === 200 && data.data.status === 'error') {
    //   typeof window !== 'undefined' && toastErrorMsg(data.data.msg );
    //   return null;
    // }

    // const res = data.data;

    // if (!res.success) {
    //   toastErrorMsg(res.msg);
    //   return null;
    // }
    const res = data.data
    if (!/2\d{2}/.test(res.code)) {
        toastErrorMsg(res.message);
      return res.message
    }

    return res.data;
  },
  (err) => {
    console.log('err:', err, err.response)
    console.log('err data:', err, err.response.data)
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 504:
        case 404:
          typeof window !== 'undefined' && toastErrorMsg('服务器异常');
          break;
        case 400:
          const errMsg = err.response.data.message
          toastErrorMsg(errMsg)
          break;

        default:
          typeof window !== 'undefined' &&
            toastErrorMsg(
              (err.response && err.response.data && err.response.data.msg) || '未知错误!'
            );
      }
    }

    return Promise.reject(err);
  }
);
