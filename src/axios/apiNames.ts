export default {
  // 基础接口
  getContact: '/customer/account/contact/list', // 获取list
  exportDetails: '/mall/front/turn/exportDetails', // 文件下载
  activityTaskList: '/mall/front/turn/activityTaskList', // 小程序- 领取免费次数任务列表
  checkFirstLuckDraw: '/mall/front/turn/checkFirstLuckDraw', // 小程序- 检查用户是否首次抽奖[0首次,1非首次]
  checkPrizePlaceOrder: '/mall/front/turn/checkPrizePlaceOrder', // 小程序-幸运大转盘奖品下单校验
  currentActivityAccount: '/mall/front/turn/currentActivityAccount', // 小程序-当前活动的账户查询
  helpFriends: '/mall/front/turn/helpFriends', // 小程序-当前活动的账户查询
  myWinningList: '/mall/front/turn/myWinningList', // 小程序-幸运大转盘分页获取我的中奖列表
  participantsNum: '/mall/front/turn/participantsNum', // 小程序-幸运大转盘参与人次获取
  queryTurnActivity: '/mall/front/turn/queryTurnActivity', // 小程序-获取当前活动内容信息
  queryTurnInviteFriends: '/mall/front/turn/queryTurnInviteFriends', // 小程序-获取分享文案信息
  turnLuckDraw: '/mall/front/turn/turnLuckDraw', // 小程序-幸运大转盘抽奖
  walkingLanternList: '/mall/front/turn/walkingLanternList', // 小程序-幸运大转盘走马灯中奖列表
  getUserInfo: '/customer/account/info', // 小程序-获取用户信息
  getQRCode: '/customer/wx/QRCode', // 小程序-生成二维码
  immediatelyReceive: '/mall/front/turn/immediatelyReceive', // 小程序-立即领取
  turnLuckDrawCheck: '/mall/front/turn/turnLuckDrawCheck' // 小程序-幸运大转盘抽奖校验
}
