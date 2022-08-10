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
  console.log('token-axios: ', token)
  let data: any = null
  if (method !== 'FILE') {
    // 非文件上传
    if (method === 'POST' || method === 'PUT') {
      data = { data: params.data }
    } else if (method === 'GET' || method === 'DELETE') {
      data = { params: params.data }
    }
    return new Promise(resolve => {
      request(params.url, {
        method,
        ...data,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          authorization: token ? token : 'Basic aHc6aHc=',
          ...params.header
        }
      })
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          console.log(err, '异常')
        })
    })
  } // 文件上传
  return new Promise(resolve => {
    request(params.url, {
      method: 'post',
      data: params.data,
      requestType: 'form',
      headers: { authorization: token ? token : 'Basic aHc6aHc=' }
    })
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        console.log(err, '异常')
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
