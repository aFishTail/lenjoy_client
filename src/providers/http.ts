import axios, { AxiosRequestHeaders } from 'axios'
import Router from 'next/router'
import storage from '@/utils/storage'
import { HttpStatusCode } from '@/constant/status-code'
import { toast } from '@/utils/toast'
import { CustomExceptionCodeEnum } from '@/common/constant'

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
        if (err && err.response && err.response.status) {
      const status = err.response.status

      switch (status) {
        case 504:
        case HttpStatusCode.NotFound:
          typeof window !== 'undefined' && toastErrorMsg('服务器异常')
          break
        case HttpStatusCode.CommonError:
          handleCustomError(err.response)
          break
        case HttpStatusCode.AuthError:
          toastErrorMsg(err.response.data.message)
          // TODO：使用redux管理全局数据，方便通信
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

// 处理自定义业务错误
function handleCustomError(response) {
  console.log('res', response)
  const {code, message} = response.data
  switch (code) {
    case CustomExceptionCodeEnum.EmailNotVerifiedCode:
      toastErrorMsg("邮箱未认证，请先认证!")
      setTimeout(() => {
        Router.push({pathname: '/user/edit', query: {tab: 'setting'}})
      }, 1000)
      break;
  
    default:
      toastErrorMsg(message)
      break;
  }
}