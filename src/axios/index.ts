import http from '@/axios/axios'
import api from '@/axios/apiNames'

/**
 * 描述
 * @date 2022-08-13
 * @param {ObjTy} data - 请求参数
 * @returns {Promise} - http请求返回的promise对象
 */
export const getContact: PromiseFn = (data: ObjTy) => {
  const params = { url: api.getContact, data }
  return http.get(params)
}

/**
 * 描述
 * @date 2022-08-13
 * @returns {Promise} - http请求返回的promise对象
 */
export const queryTurnActivity: PromiseFn = () => {
  const params = { url: api.queryTurnActivity }
  return http.get(params)
}
