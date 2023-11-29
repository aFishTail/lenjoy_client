import axios, { AxiosRequestHeaders } from 'axios'
import Router from 'next/router'
import storage from '@/utils/storage'
import { HttpStatusCode } from '@/constant/status-code'
import { toast } from '@/utils/toast'

const clearStorageAndRedict = () => {
  const user = storage.clearAll()
  Router.push('/signin')
}

const toastErrorMsg = (msg: string) => {
  toast({
    title: msg,
    status: 'error',
    position: 'top',
  })
}

export const httpProvider = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
})

httpProvider.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = storage.getItem('token')
      console.log('token:', token)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
    }
    return config
  },

  () => {
    throw new Error('发起请求出错')
  }
)

httpProvider.interceptors.response.use(
  (data) => {
    const res = data.data
    if (!/2\d{2}/.test(res.code)) {
      toastErrorMsg(res.message)
      return res.message
    }
    return res.data
  },
  (err) => {
    console.log('err:', err)
    if (err && err.response && err.response.status) {
      const status = err.response.status

      switch (status) {
        case 504:
        case HttpStatusCode.NotFound:
          typeof window !== 'undefined' && toastErrorMsg('服务器异常')
          break
        case HttpStatusCode.CommonError:
          toastErrorMsg(err.response.data.message)
          break
        case HttpStatusCode.AuthError:
          toastErrorMsg(err.response.data.message)
          clearStorageAndRedict()
          break

        default:
          typeof window !== 'undefined' &&
            toastErrorMsg(
              (err.response && err.response.data && err.response.data.msg) ||
                '未知错误!'
            )
      }
    }

    return Promise.reject(err)
  }
)
