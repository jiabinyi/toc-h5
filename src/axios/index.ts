import http from '@/axios/axios'
import api from '@/axios/apiNames'

export const getContact: PromiseFn = () => {
  const params = { url: api.getContact }
  return http.get(params)
}
