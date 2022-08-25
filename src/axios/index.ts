import http from '@/axios/axios'
import api from '@/axios/apiNames'
import { sessions } from 'mosowejs'

/**
 * 获取联系人
 * @date 2022-08-13
 * @param {ObjTy} data - 请求参数
 * @returns {Promise} - http请求返回的promise对象
 */
export const getContact: PromiseFn = (data: ObjTy) => {
  const params = { url: api.getContact, data }
  return http.get(params)
}

/**
 * 【幸运大转盘】活动详情
 * @date 2022-08-13
 * @returns {Promise} - http请求返回的promise对象
 */
export const queryTurnActivity: PromiseFn = () => {
  const params = { url: `${api.queryTurnActivity}/${sessions.get('appCode')}` }
  return http.get(params)
}

/**
 *【幸运大转盘】 领取免费次数任务列表
 * @author yijiabin
 * @date 2022-08-25
 * @returns {any}
 */
export const activityTaskList: PromiseFn = () => {
  const params = { url: `${api.activityTaskList}/${sessions.get('appCode')}` }
  return http.get(params)
}

/**
 * 【幸运大转盘】邀请朋友海报信息
 * @author yijiabin
 * @date 2022-08-25
 * @param {any} params
 * @returns {any}
 */
export const queryTurnInviteFriends: PromiseFn = data => {
  const params = { url: `${api.queryTurnInviteFriends}/${data.activityId}/${data.fissionType}` }
  return http.get(params)
}

/**
 * 【幸运大转盘】我的奖品列表
 * @author yijiabin
 * @date 2022-08-25
 * @returns {any}
 */
export const myWinningList: PromiseFn = () => {
  const params = { url: `${api.myWinningList}/${sessions.get('appCode')}` }
  return http.get(params)
}

/**
 * 【幸运大转盘】抽奖
 * @author yijiabin
 * @date 2022-08-25
 * @param {any} params
 * @returns {any}
 */
export const turnLuckDraw: PromiseFn = data => {
  const params = {
    url: `${api.turnLuckDraw}/${data.activityId}/${data.custId}`,
    data: {
      activityId: data.activityId,
      custId: data.custId
    }
  }
  return http.post(params)
}

/**
 * 【幸运大转盘】获取用户信息
 * @author yijiabin
 * @date 2022-08-25
 * @returns {any}
 */
export const getUserInfo: PromiseFn = () => {
  const params = { url: api.getUserInfo }
  return http.get(params)
}

/**
 * 【幸运大转盘】获取二维码
 * @author yijiabin
 * @date 2022-08-25
 * @param {any} data.sharePagePath
 * @returns {any}
 */
export const getQRCode: PromiseFn = data => {
  const params = {
    url: api.getQRCode,
    data: {
      scene: `1;${data.activityId};${data.custId}`,
      page: decodeURIComponent(data.sharePagePath),
      checkPath: false,
      check_path: false,
      env_version: data.envVersion,
      envVersion: data.envVersion
    },
    responseType: 'blob'
  }
  return http.get(params)
}

/**
 * 【幸运大转盘】立即领取
 * @author yijiabin
 * @date 2022-08-25
 * @param {any} params
 * @returns {any}
 */
export const immediatelyReceive: PromiseFn = data => {
  const params = {
    url: `${api.immediatelyReceive}/${data.activityId}/${data.custId}`,
    data: {
      activityId: data.activityId,
      custId: data.custId
    }
  }
  return http.post(params)
}

/**
 * 【幸运大转盘】幸运大转盘助力好友
 * @author yijiabin
 * @date 2022-08-25
 * @param {any} params
 * @returns {any}
 */
export const helpFriends: PromiseFn = data => {
  const params = {
    url: `${api.helpFriends}/${data.activityId}/${data.userId}/${data.helpUserId}`,
    data: {
      activityId: data.activityId,
      helpUserId: data.helpUserId,
      userId: data.userId
    }
  }
  return http.post(params)
}

/**
 * 【幸运大转盘】当前活动的账户查询
 * @author yijiabin
 * @date 2022-08-25
 * @returns {any}
 */
export const currentActivityAccount: PromiseFn = () => {
  const params = { url: `${api.currentActivityAccount}/${sessions.get('appCode')}` }
  return http.get(params)
}

/**
 * 【幸运大转盘】中奖者跑马灯
 * @author yijiabin
 * @date 2022-08-25
 * @returns {any}
 */
export const walkingLanternList: PromiseFn = () => {
  const params = { url: `${api.walkingLanternList}/${sessions.get('appCode')}` }
  return http.get(params)
}

/**
 * 【幸运大转盘】幸运大转盘抽奖校验
 * @author yijiabin
 * @date 2022-08-25
 * @param {any} params
 * @returns {any}
 */
export const turnLuckDrawCheck: PromiseFn = data => {
  const params = {
    url: `${api.turnLuckDrawCheck}/${data.activityId}/${data.userId}`,
    data: {}
  }

  return http.post(params)
}
