declare namespace WeixinJsSdk {
  const miniProgram: any

  type JSApis =
    | 'onMenuShareTimeline'
    | 'onMenuShareAppMessage'
    | 'onMenuShareQQ'
    | 'onMenuShareWeibo'
    | 'onMenuShareQZone'
    | 'startRecord'
    | 'stopRecord'
    | 'onVoiceRecordEnd'
    | 'playVoice'
    | 'pauseVoice'
    | 'stopVoice'
    | 'onVoicePlayEnd'
    | 'uploadVoice'
    | 'downloadVoice'
    | 'chooseImage'
    | 'previewImage'
    | 'uploadImage'
    | 'downloadImage'
    | 'translateVoice'
    | 'getNetworkType'
    | 'openLocation'
    | 'getLocation'
    | 'hideOptionMenu'
    | 'showOptionMenu'
    | 'hideMenuItems'
    | 'showMenuItems'
    | 'hideAllNonBaseMenuItem'
    | 'showAllNonBaseMenuItem'
    | 'closeWindow'
    | 'scanQRCode'
    | 'chooseWXPay'
    | 'openProductSpecificView'
    | 'addCard'
    | 'chooseCard'
    | 'openCard'
    | 'checkJsApi'
    | 'onRecordEnd'
    | 'openWXDeviceLib'
    | 'closeWXDeviceLib'
    | 'configWXDeviceWiFi'
    | 'getWXDeviceInfos'
    | 'sendDataToWXDevice'
    | 'startScanWXDevice'
    | 'stopScanWXDevice'
    | 'connectWXDevice'
    | 'disconnectWXDevice'
    | 'getWXDeviceTicket'
    | 'WeixinJSBridgeReady'
    | 'onWXDeviceBindStateChange'
    | 'onWXDeviceStateChange'
    | 'onScanWXDeviceResult'
    | 'onReceiveDataFromWXDevice'
    | 'onWXDeviceBluetoothStateChange'

  type Menus =
    | 'menuItem:exposeArticle' // 举报
    | 'menuItem:setFont' // 调整字体
    | 'menuItem:dayMode' // 日间模式
    | 'menuItem:nightMode' // 夜间模式
    | 'menuItem:refresh' // 刷新
    | 'menuItem:profile' // 查看公众号（已添加）
    | 'menuItem:addContact' // 查看公众号（未添加）
    | 'menuItem:share:appMessage' // 发送给朋友
    | 'menuItem:share:timeline' // 分享到朋友圈
    | 'menuItem:share:qq' // 分享到 QQ
    | 'menuItem:share:weiboApp' // 分享到 Weibo
    | 'menuItem:favorite' // 收藏
    | 'menuItem:share:facebook' // 分享到 Facebook
    | 'menuItem:share:QZone' // 分享到 QQ 空间
    | 'menuItem:editTag' // 编辑标签
    | 'menuItem:delete' // 删除
    | 'menuItem:copyUrl' // 复制链接
    | 'menuItem:originPage' // 原网页
    | 'menuItem:readMode' // 阅读模式
    | 'menuItem:openWithQQBrowser' // 在QQ浏览器中打开
    | 'menuItem:openWithSafari' // 在Safari中打开
    | 'menuItem:share:email' // 邮件
    | 'menuItem:share:brand' // 一些特殊公众号

  type scanTypes =
    | 'qrCode' // 二维码
    | 'barCode' // 一维码

  type ImageSize = 'original' | 'compressed'
  type SourceType = 'album' | 'camera'

  /**
   * **************************************************************************
   * Interface definations
   ***************************************************************************
   */

  interface ConfigOptions {
    debug?: boolean
    appId: string
    timestamp: string | number
    nonceStr: string
    signature: string
    jsApiList: JSApis[]
    beta: boolean
    [x: string]: any
  }

  /**
   * 所有接口通过wx对象(也可使用jWeixin对象)来调用，参数是一个对象，
   * 除了每个接口本身需要传的参数之外，还有以下通用参数
   */
  interface Callbacks {
    success?: (res: any) => void
    fail?: (res: any) => void
    complete?: (res: any) => void
    cancel?: (res: any) => void
  }

  /**
   * 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
   */
  interface MenuCallbacks extends Callbacks {
    trigger?: (res: any) => void
  }

  /**
   * 需要检测的JS接口列表
   */
  interface CheckJsApiOptions extends Callbacks {
    jsApiList: JSApis[]
  }

  /**
   * 分享标题
   * 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * 分享图标
   */
  interface OnMenuShareTimelineOptions extends MenuCallbacks {
    title: string
    link: string
    imgUrl?: string
  }

  interface OnMenuShareAppMessageOptions extends OnMenuShareTimelineOptions {
    desc?: string
    type?: 'music' | 'video' | 'link'
    dataUrl?: string
  }

  interface OnMenuShareQQ extends OnMenuShareTimelineOptions {
    desc?: string
  }

  interface OnMenuShareWeibo extends OnMenuShareTimelineOptions {
    desc?: string
  }

  interface OnMenuShareQZone extends OnMenuShareTimelineOptions {
    desc?: string
  }

  interface ChooseImageOptions extends Callbacks {
    count?: number
    sizeType?: ImageSize[]
    sourceType?: SourceType[]
  }

  interface PreviewImageOptions extends Callbacks {
    current: string
    urls: string[]
  }

  interface UploadImageOptions extends Callbacks {
    localId: string
    isShowProgressTips?: boolean
  }

  interface DownloadImageOptions extends Callbacks {
    serverId: string
    isShowProgressTips?: boolean
  }

  interface GetLocalImgDataOptions extends Callbacks {
    localId: string
  }

  interface LocalVoiceOptions extends Callbacks {
    localId: string
  }

  interface UploadVoiceOptions extends LocalVoiceOptions {
    isShowProgressTips?: boolean
  }

  interface DownloadVoiceOptions extends Callbacks {
    serverId: string
    isShowProgressTips?: boolean
  }

  interface OpenLocationOptions extends Callbacks {
    latitude: number
    longitude: number
    name: string
    address: string
    scale?: number
    infoUrl?: string
  }

  interface GetLocationOptions extends Callbacks {
    type: 'wgs84' | 'gcj02'
  }

  interface StartSearchBeacons {
    ticket: string
  }

  interface MenuOptions {
    menuList: Menus[]
  }

  interface ScanQRCodeOptions extends Callbacks {
    needResult?: 0 | 1
    scanType?: scanTypes[]
  }

  interface OpenProductSpecificViewOptions {
    productId: string
    viewType: 0 | 1 | 2
  }

  interface ChooseCardOptions extends Callbacks {
    shopId?: string
    cardType?: string
    cardId?: string
    timestamp: number
    nonceStr: string
    signType: 'SHA1'
    cardSign: string
  }

  interface AddCard {
    cardId: string
    cardExt: string
  }

  interface AddCardOptions extends Callbacks {
    cardList: AddCard[]
  }

  interface OpenCard {
    cardId: string
    code: string
  }

  interface OpenCardOptions extends Callbacks {
    cardList: OpenCard[]
  }

  interface ChooseWXPayOptions extends Callbacks {
    timestamp: string
    nonceStr: string
    package: string
    signType: 'SHA1' | 'MD5'
    paySign: string
  }

  /**
   * **************************************************************************
   * 配置方法
   ***************************************************************************
   */

  /**
   * 注入权限验证配置
   * 所有需要使用 JS-SDK 的页面必须先注入配置信息，否则将无法调用。
   * （同一个 url 仅需调用一次，对于变化 url 的 SPA 的 web app 可在每次url变化时进行调用,
   * 目前 Android 微信客户端不支持 pushState 的 H5 新特性，
   * 所以使用 pushState 来实现 web app 的页面会导致签名失败，
   * 此问题会在 Android6.2中修复。）
   */
  function config(options: ConfigOptions): void

  /**
   * 处理成功验证
   *
   * config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
   * config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
   * 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
   * 则可以直接调用，不需要放在ready函数中。
   */
  function ready(callback: () => void): void

  /**
   * 处理失败验证
   *
   * config信息验证失败会执行error函数，如签名过期导致验证失败，
   * 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
   * 对于SPA可以在这里更新签名。
   */
  function error(callback: (res: any) => void): void

  /**
   * 判断当前客户端版本是否支持指定JS接口
   *
   * 备注：checkJsApi接口是客户端6.0.2新引入的一个预留接口，
   * 第一期开放的接口均可不使用checkJsApi来检测。
   */
  function checkJsApi(options: CheckJsApiOptions): void

  /**
   * **************************************************************************
   * 分享接口
   ***************************************************************************
   */

  /**
   * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareTimeline(options: OnMenuShareTimelineOptions): void

  /**
   * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareAppMessage(options: OnMenuShareAppMessageOptions): void

  /**
   * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareQQ(options: OnMenuShareQQ): void

  /**
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareWeibo(options: OnMenuShareWeibo): void

  /**
   * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
   */
  function onMenuShareQZone(options: OnMenuShareQZone): void

  /**
   * **************************************************************************
   * 图像接口
   ***************************************************************************
   */

  /**
   * 拍照或从手机相册中选图接口
   */
  function chooseImage(options: ChooseImageOptions): void

  /**
   * 预览图片接口
   */
  function previewImage(options: PreviewImageOptions): void

  /**
   * 上传图片接口
   *
   * 备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
   */
  function uploadImage(options: UploadImageOptions): void

  /**
   * 下载图片接口
   */
  function downloadImage(options: DownloadImageOptions): void

  /**
   * 获取本地图片接口
   */
  function getLocalImgData(options: GetLocalImgDataOptions): void

  /**
   * **************************************************************************
   * 音频接口
   ***************************************************************************
   */

  /**
   * 开始录音接口
   */
  function startRecord(): void

  /**
   * 停止录音接口
   */
  function stopRecord(options: Callbacks): void

  /**
   * 监听录音自动停止接口
   */
  function onVoiceRecordEnd(options: Callbacks): void

  /**
   * 播放语音接口
   */
  function playVoice(options: LocalVoiceOptions): void

  /**
   * 暂停播放接口
   */
  function pauseVoice(options: LocalVoiceOptions): void

  /**
   * 停止播放接口
   */
  function stopVoice(options: LocalVoiceOptions): void

  /**
   * 监听语音播放完毕接口
   */
  function onVoicePlayEnd(options: Callbacks): void

  /**
   * 上传语音接口
   */
  function uploadVoice(options: UploadVoiceOptions): void

  /**
   * 下载语音接口
   */
  function downloadVoice(options: DownloadVoiceOptions): void

  /**
   * **************************************************************************
   * 智能接口
   ***************************************************************************
   */

  /**
   * 识别音频并返回识别结果接口
   */
  function translateVoice(options: UploadVoiceOptions): void

  /**
   * **************************************************************************
   * 设备信息
   ***************************************************************************
   */

  /**
   * 获取网络状态接口
   */
  function getNetworkType(options: Callbacks): void

  /**
   * **************************************************************************
   * 地理信息
   ***************************************************************************
   */

  /**
   * 使用微信内置地图查看位置接口
   */
  function openLocation(options: OpenLocationOptions): void

  /**
   * 获取地理位置接口
   */
  function getLocation(options: GetLocationOptions): void

  /**
   * **************************************************************************
   * 摇一摇周边
   ***************************************************************************
   */

  /**
   * 开启查找周边ibeacon设备接口
   */
  function startSearchBeacons(options: StartSearchBeacons): void

  /**
   * 关闭查找周边ibeacon设备接口
   */
  function stopSearchBeacons(options: Callbacks): void

  /**
   * 监听周边ibeacon设备接口
   *
   * 备注：上述摇一摇周边接口使用注意事项及更多返回结果说明，请参考：摇一摇周边获取设备信息
   */
  function onSearchBeacons(options: Callbacks): void

  /**
   * **************************************************************************
   * 界面操作
   ***************************************************************************
   */

  /**
   * 关闭当前网页窗口接口
   */
  function closeWindow(): void

  /**
   * 批量隐藏功能按钮接口
   */
  function hideMenuItems(options: MenuOptions): void

  /**
   * 批量显示功能按钮接口
   */
  function showMenuItems(options: MenuOptions): void

  /**
   * 隐藏所有非基础按钮接口
   */
  function hideAllNonBaseMenuItem(): void

  /**
   * 显示所有功能按钮接口
   */
  function showAllNonBaseMenuItem(): void

  /**
   * **************************************************************************
   * 微信扫一扫
   ***************************************************************************
   */

  /**
   * 调起微信扫一扫接口
   */
  function scanQRCode(options: ScanQRCodeOptions): void

  /**
   * **************************************************************************
   * 微信小店
   ***************************************************************************
   */

  /**
   * 跳转微信商品页接口
   */
  function openProductSpecificView(
    options: OpenProductSpecificViewOptions
  ): void

  /**
   * **************************************************************************
   * 微信卡券
   ***************************************************************************
   */

  /**
   * 拉取适用卡券列表并获取用户选择信息
   */
  function chooseCard(options: ChooseCardOptions): void

  /**
   * 批量添加卡券接口
   */
  function addCard(options: AddCardOptions): void

  /**
   * 查看微信卡包中的卡券接口
   */
  function openCard(options: OpenCardOptions): void

  /**
   * **************************************************************************
   * 微信支付
   ***************************************************************************
   */

  /**
   * 发起一个微信支付请求
   */
  function chooseWXPay(options: ChooseWXPayOptions): void
}

declare module 'weixin-js-sdk' {
  export = WeixinJsSdk
}
