<template>
  <DialogCustom v-model:visible="visible">
    <div class="dialogPoster">
      <div class="sharer">
        <img src="@/common/assets/images/blue/invitation-icon.png" />
        来自树上的猫的分享
      </div>
      <div class="canvas-wrap">
        <div class="canvas" id="canvas">
          <div class="pic">
            <img src="@/common/assets/images/blue/invitation-icon.png" />
          </div>
          <div class="prizes">
            <div class="item">
              <img src="@/common/assets/images/blue/invitation-icon.png" />
              <div class="ifo">
                <div class="title">特等奖：美图手机 pro600</div>
                <div class="num">1份</div>
              </div>
            </div>
            <div class="item">
              <img src="@/common/assets/images/blue/invitation-icon.png" />
              <div class="ifo">
                <div class="title">特等奖：美图手机 pro600</div>
                <div class="num">1份</div>
              </div>
            </div>
          </div>
          <div class="foot">
            <div class="tip">
              <div class="tip1">长按识别二维码</div>
              <div class="tip2">立即免费参与</div>
            </div>
            <div class="qrcode">
              <img src="@/common/assets/images/blue/invitation-icon.png" />
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
import html2canvas from 'html2canvas'

// 弹窗
import DialogCustom from '@/components/DialogCustom/index.vue'

setTimeout(() => {
  renderPoster()
}, 2000)

let canvasID: any = {}
const renderPoster = () => {
  canvasID = document.getElementById('canvas')
  const opts = {
    tainttest: true, // 检测每张图片都已经加载完成
    useCORS: true, // 跨域处理，可以加载网络图片
    logging: true // 日志开关
  }
  html2canvas(canvasID, opts).then(canvas => {
    let image = new Image()
    const dom = document.getElementById('canvas_pic')

    image.src = canvas.toDataURL()

    dom?.appendChild(image)
  })
}

const visible = ref(true)
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
