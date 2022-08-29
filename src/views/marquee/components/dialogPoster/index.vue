<template>
  <DialogCustom v-model:visible="visible" @close="close">
    <div class="dialog-poster">
      <div class="canvas-wrap">
        <div class="canvas" id="canvas">
          <div class="sharer">
            <img class="image" :src="UserStore.userInfo.head_img_url" />
            <div class="title">{{ UserStore.userInfo.nick_name }}@{{ activityData.turn_activity.share_title }}</div>
          </div>
          <div class="pic">
            <img :src="activityData.turn_activity.share_pic_url" />
          </div>

          <div class="prizes">
            <div class="item" v-for="(item, index) in data.turn_prize_vo_list.slice(0, 2)" :key="index">
              <div class="img"><img :src="item.pic_url" /></div>
              <div class="ifo">
                <div class="title">
                  {{ (item?.choice_prize_name ?? '') + '：' + item.prize_name }}
                </div>
                <div class="num">{{ item.prize_goods_num }}份</div>
              </div>
            </div>
          </div>
          <div class="foot">
            <div class="tip">
              <div class="tip1">
                长按识别二维码
                <img :src="handImg" class="hand" />
              </div>
              <div class="tip2">立即免费参与</div>
            </div>
            <div class="qrcode">
              <nut-image :src="qrcodeImg" width="100" height="100" showError>
                <template #error> <nut-icon name="loading"></nut-icon> </template>
              </nut-image>
            </div>
          </div>
        </div>
        <div id="cover">
          <nut-image :src="''" width="100%" height="100%" showError>
            <template #error> <nut-icon name="loading"></nut-icon> </template>
          </nut-image>
        </div>
        <div id="canvas_pic"></div>
      </div>
      <div class="foot-message">提示：长按保存分享图片</div>
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="DialogPoster">
import { getQRCode } from '@/axios'
import { useRequest } from 'vue-request'
import { useUserStore } from '@/store/modules/user.ts'
import { sessions } from 'mosowejs'
import handImg from '@common/assets/images/blue/share-hand.png'
import html2canvas from 'html2canvas'
// 弹窗
import DialogCustom from '@/components/DialogCustom/index.vue'
// 对象-组件代理
const { proxy } = getCurrentInstance() as ObjTy
const UserStore = useUserStore()
const props = defineProps({
  // 变量-显示隐藏弹窗
  visible: {
    type: Boolean,
    default: false
  },
  // 数据-活动规则
  data: {
    type: Object,
    default: () => new Object()
  },
  activityData: {
    type: Object,
    default: () => new Object()
  },
  helpShareData: {
    type: Object,
    default: () => new Object()
  }
})
// prop响应式
const emit = defineEmits(['update:visible'])
const visible = useVModel(props, 'visible', emit)
const activityData = useVModel(props, 'activityData')

const qrcodeImg = ref('')

/**
 * // 方法 获取小程序码
 * @author yijiabin
 * @date 2022-08-24
 * @param {any} getQRCode
 * @param {any} {manual:true
 * @param {any} onSuccess:(res:any
 * @returns {any}
 */
const { run: runGetQRCode } = useRequest(getQRCode, {
  manual: true,
  onSuccess: (res: any) => {
    if (res) {
      const binaryData = []
      binaryData.push(res)
      qrcodeImg.value = window.URL.createObjectURL(new Blob(binaryData))
      setTimeout(() => {
        renderPosterImage()
      }, 200)
    }
  },
  onError: () => {
    proxy.$toast.hide()
  }
})
let dom = document.getElementById('canvas_pic') as HTMLElement
let canvasID: HTMLElement

/**
 * 生成海报第一步-获取二维码
 * @author yijiabin
 * @date 2022-08-24
 * @returns {any}
 */
const renderPoster = () => {
  dom = document.getElementById('canvas_pic') as HTMLElement
  dom.innerHTML = ''
  qrcodeImg.value = ''
  showQRcodeImg.value = false
  // proxy.$toast.loading('生成中...')
  runGetQRCode({
    sharePagePath: 'pages/common/pages/webview/webview',
    activityId: activityData.value.turn_activity.id,
    custId: sessions.get('cust_id'),
    envVersion: sessions.get('envVersion')
  })
}

/**
 * 生成海报第二部 base64转图片
 * @author yijiabin
 * @date 2022-08-24
 * @returns {any}
 */
const renderPosterImage = () => {
  canvasID = document.getElementById('canvas') ?? document.body
  showQRcodeImg.value = true
  const opts = {
    tainttest: true, // 检测每张图片都已经加载完成
    useCORS: true, // 跨域处理，可以加载网络图片
    logging: true // 日志开关
  }
  if (canvasID !== document.body) {
    html2canvas(canvasID, opts).then((canvas: { toDataURL: () => string }) => {
      const image = new Image()

      dom.innerHTML = ''
      image.src = canvas.toDataURL()

      dom?.appendChild(image)
      setTimeout(() => {
        proxy.$toast.hide()
      }, 200)
    })
  }
}
const showQRcodeImg = ref(false)
defineExpose({ renderPoster })

/**
 * 关闭弹窗前重置小程序码
 * @author yijiabin
 * @date 2022-08-24
 * @returns {any}
 */
const close = () => {
  qrcodeImg.value = ''
  dom.innerHTML = ''
}
</script>
<style lang="scss">
.dialog-poster {
  width: 285px;
  min-height: 420px;
  display: block;
  background: #fff;
  border-radius: 8px;
  .sharer {
    height: 60px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    img {
      overflow: hidden;
      width: 28px;
      height: 28px;
      border-radius: 28px;
      margin-right: 5px;
      flex-shrink: 0;
    }

    font-size: 14px;

    font-weight: 500;
    color: #333;
    line-height: 14px;
    .title {
      display: flex;
      flex-grow: 1;
      justify-content: flex-start;
      line-height: 24px;
      text-align: left;
    }
  }
  .canvas-wrap {
    position: relative;
  }
  #canvas {
    opacity: 1;
  }
  .canvas {
    padding: 11px;
    .pic {
      width: 262px;
      height: 140px;
      img {
        width: 262px;
        height: 140px;
      }
    }
    .prizes {
      .item {
        margin-top: 20px;
        display: flex;
        .img {
          @include flex-center;
          width: 40px;
          height: 40px;
        }
        img {
          width: 40px;
          height: auto;
        }
        .ifo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          margin-left: 15px;
          .title {
            font-size: 14px;

            font-weight: 500;
            color: #333;
            line-height: 19px;
          }
          .num {
            font-size: 12px;

            font-weight: 400;
            color: #999;
          }
        }
      }
    }
    .foot {
      margin-top: 20px;
      display: flex;
      .tip {
        font-size: 12px;
        font-weight: 400;
        color: #333;
        line-height: 22px;
        flex-grow: 1;
        text-align: left;
        .hand {
          width: 19px;
          height: 10px;
        }
      }
      img {
        width: 67px;
        height: 67px;
      }
      .qrcode {
        .nut-image {
          width: 67px !important;
          height: 67px !important;
        }
      }
    }
  }
  .foot-message {
    line-height: 40px;
  }
  #canvas_pic {
    position: absolute;
    top: 0;
    left: 0;
    img {
      width: 100%;
    }
    z-index: 10;
  }
  #cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 2;
  }
}
</style>
