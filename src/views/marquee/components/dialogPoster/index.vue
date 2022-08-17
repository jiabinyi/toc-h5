<template>
  <DialogCustom v-model:visible="visible">
    <div class="dialogPoster">
      <div class="sharer">
        <img :src="UserStore.userInfo.head_img_url" />
        来自{{ UserStore.userInfo.nick_name }}的分享
      </div>
      <div class="canvas-wrap">
        <div class="canvas" id="canvas">
          <div class="pic">
            <img :src="activityData.turn_activity.share_pic_url" />
          </div>
          <div class="prizes">
            <div
              class="item"
              v-for="(item, index) in data.turn_prize_vo_list.slice(0, 2)"
              :key="index"
            >
              <img :src="item.pic_url" />
              <div class="ifo">
                <div class="title">{{ item.goods_name }}</div>
                <div class="num">{{ item.prize_goods_num }}份</div>
              </div>
            </div>
          </div>
          <div class="foot">
            <div class="tip">
              <div class="tip1">长按识别二维码</div>
              <div class="tip2">立即免费参与</div>
            </div>
            <div class="qrcode">
              <img :src="qrcodeImg" />
            </div>
          </div>
        </div>
        <div id="canvas_pic"></div>
      </div>
      <div class="foot-message">提示：长按保存分享图片</div>
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="Home">
import { getQRCode } from '@/axios'
import { useRequest } from 'vue-request'
import { useUserStore } from '@/store/modules/user.ts'
import { sessions } from 'mosowejs'
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
  }
})
// prop响应式
const emit = defineEmits(['update:visible'])
const visible = useVModel(props, 'visible', emit)
const activityData = useVModel(props, 'activityData')
import html2canvas from 'html2canvas'
// 弹窗
import DialogCustom from '@/components/DialogCustom/index.vue'
const qrcodeImg = ref('')
// 获取小程序码
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
  }
})

let canvasID: HTMLElement
const renderPoster = () => {
  runGetQRCode({
    sharePagePath: 'pages/webview/webview',
    activityId: activityData.value.turn_activity.id,
    custId: sessions.get('cust_id'),
    envVersion: sessions.get('envVersion')
  })
}
const renderPosterImage = () => {
  canvasID = document.getElementById('canvas') ?? document.body

  const opts = {
    tainttest: true, // 检测每张图片都已经加载完成
    useCORS: true, // 跨域处理，可以加载网络图片
    logging: true // 日志开关
  }
  if (canvasID !== document.body) {
    html2canvas(canvasID, opts).then((canvas: { toDataURL: () => string }) => {
      const image = new Image()
      const dom = document.getElementById('canvas_pic')
      image.src = canvas.toDataURL()

      dom?.appendChild(image)
    })
  }
}
defineExpose({ renderPoster })
</script>
<style lang="scss">
.dialogPoster {
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
    }
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 14px;
  }
  .canvas-wrap {
    position: relative;
  }
  #canvas {
    opacity: 1;
  }

  .canvas {
    padding: 11px 11px;
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
        img {
          width: 40px;
          height: 40px;
        }
        .ifo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          margin-left: 15px;

          .title {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 19px;
          }
          .num {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
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
        color: #333333;
        line-height: 22px;
        flex-grow: 1;
        text-align: left;
      }
      img {
        width: 67px;
        height: 67px;
      }
    }
  }

  .foot-message {
    line-height: 40px;
  }
  #canvas_pic {
    position: absolute;
    top: 0px;
    left: 0px;
    img {
      width: 100%;
    }
  }
}
</style>
