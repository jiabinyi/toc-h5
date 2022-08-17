/* eslint-disable @typescript-eslint/no-explicit-any */
import request from './axiosConfig'
import { sessions } from 'mosowejs'

interface api {
  url: string
  data?: any
  header?: any
}

const httpConfig = (method: string, params?: any) => {
  const token = sessions.get('token')
  let data: any = null
  if (method !== 'FILE') {
    // 非文件上传
    if (method === 'POST' || method === 'PUT') {
      data = { data: params.data }
    } else if (method === 'GET' || method === 'DELETE') {
      data = { params: params.data }
    }
    return new Promise((resolve, reject) => {
      request(params.url, {
        method,
        ...data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: `bearer ${token}`,
          tenant: import.meta.env.VITE_APP_TENANT,
          ...params.header
        },
        responseType: params.responseType
      })
        .then((res: any) => {
          if (params.responseType === 'blob') {
            resolve(res)
            return
          }
          res.result.code === 'Success' ? resolve(res) : reject(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
  // 文件上传
  return new Promise((resolve, reject) => {
    request(params.url, {
      method: 'post',
      data: params.data,
      requestType: 'form',
      headers: { authorization: token ? token : 'bearer' }
    })
      .then((res: any) => {
        res.result.code !== 'Success' ? resolve(res) : reject(res)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export default {
  post: (params: api) => httpConfig('POST', params),
  get: (params: api) => httpConfig('GET', params),
  delete: (params: api) => httpConfig('DELETE', params),
  put: (params: api) => httpConfig('PUT', params),
  file: (params: api) => httpConfig('FILE', params)
}
