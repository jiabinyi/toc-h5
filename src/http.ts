import $axios from 'axios'
import { Method } from 'axios'
import $store from '@/store/store'
let service = $axios.create({
  timeout: 60000,
  withCredentials: false,
  headers: {
    'content-type': 'application/json;charset=utf-8'
  }
})

let $request = (type: Method, api: any, params?: any, config: any = {}) => {
  if (params.url_add) {
    api.url = api.url + params.url_add
    delete params.url_add
  }
  // 请求头
  const header = {
    'platform-type': $store.state.$app,
    'client-type': $store.state.$clientType,
    'client-id': $store.state.$clientId,
    ...params.header,
    tenant: $store.state.$tenantCode, //租户编码
    authorization: $store.state.$authorization //授权标识 登录后返回的session_id
  }

  return new Promise((resolve, reject) => {
    service({
      header,
      baseURL: $store.state.baseURL, //线上数据
      params: type === 'get' ? params : '',
      data: type === 'post' ? params : '',
      method: type,
      url: api.url,
      ...config
    })
      .then(({ data }) => {
        let { code, status } = data
        switch (status) {
          case true:
            resolve(data)
            break
          default:
            resolve(data)
            break
        }
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
export default $request
