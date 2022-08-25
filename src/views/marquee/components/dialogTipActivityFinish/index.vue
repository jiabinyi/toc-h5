<template>
  <DialogCustom v-model:visible="visible" hideCloseBtn>
    <div class="dialog-tip-activity-finish">
      <div class="title">温馨提示</div>
      <div class="content">
        <div class="content-txt">
          {{ data.txt }}，将在 <span>{{ time }}s</span> 后自动前往小程序首页
        </div>
      </div>
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="DialogTipActivityFinish">
// 弹窗外层组件-自定义
import DialogCustom from '@/components/DialogCustom/index.vue'
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
  }
})
// prop响应式
const emit = defineEmits(['update:visible'])
const visible = useVModel(props, 'visible', emit)

const time = ref(3)
const { pause, resume } = useIntervalFn(
  () => {
    // 每隔多长时间做什么 回调
    time.value--
    if (time.value <= 0) {
      goToHome()
      pause()
    }
  },
  1000,
  { immediate: false }
)

/**
 * 回到小程序首页
 * @author yijiabin
 * @date 2022-08-19
 * @returns {any}
 */
const goToHome = async () => {
  const url = '/pages/common/pages/webview/webview?type=switchTab&target=index'
  const wx = await import('wechat-ts-sdk').then(module => module.default)
  wx.miniProgram.navigateTo({ url }) // 跳到小程序原生页面
}
resume()
</script>
<style lang="scss" scoped>
.dialog-tip-activity-finish {
  padding-bottom: 20px;
  border: 0px solid #ffc10a;
  width: 255px;
  min-height: 120px;
  background: #ffffff;
  border-radius: 8px;
  display: block;
  .title {
    height: 80px;
    font-size: 16px;

    font-weight: 600;
    color: #333333;
    line-height: 16px;
    @include flex-center;
  }
  .content {
    padding: 0 21px 11px 21px;
    text-align: left;
    .content-title {
      font-size: 14px;

      font-weight: 600;
      color: #333333;
      line-height: 18px;
    }
    .content-txt {
      font-size: 14px;
      font-weight: 200;
      color: #777;
      line-height: 24px;
      span {
        color: #ffc10a;
      }
    }
    .content-txt-center {
      text-align: center;
    }
  }
  .footer {
    padding-bottom: 25px;
    padding-top: 25px;
    @include flex-center;
    .btn {
      width: 120px;
      height: 36px;
      background: #ffc10a;
      box-shadow: 0px 2px 4px 0px rgba(255, 193, 10, 0.15);
      border-radius: 20px;
      font-size: 16px;

      font-weight: 500;
      color: #ffffff;
      line-height: 36px;
    }
  }
}
</style>
