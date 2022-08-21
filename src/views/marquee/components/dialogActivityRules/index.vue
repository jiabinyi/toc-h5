<template>
  <DialogCustom v-model:visible="visible">
    <div class="dialogActivityRules">
      <div class="title">活动规则</div>
      <div class="content">
        <div class="content-title">活动规则</div>
        <div class="content-txt">
          1. 本次活动时间：{{ data.activity_time_explain }}；
        </div>
        <div class="content-txt">
          2. 下单时间：{{ data.time_duration_explain }}；
        </div>
      </div>
      <div class="content">
        <div class="content-title">活动说明</div>
        <div class="content-txt">{{ data.remark }}</div>
      </div>
      <div class="footer" @click="visible = false">
        <div class="btn">我知道了</div>
      </div>
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="Home">
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
</script>
<style lang="scss">
.dialogActivityRules {
  width: 337px;
  min-height: 120px;
  background: #ffffff;
  border-radius: 8px;
  display: block;
  .title {
    height: 80px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    @include flex-center;
  }
  .content {
    padding: 0 11px 11px 11px;
    text-align: left;
    .content-title {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 28px;
    }
    .content-txt {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 200;
      color: #777;
      line-height: 28px;
    }
  }
  .footer {
    padding-bottom: 25px;
    padding-top: 25px;
    @include flex-center;
    .btn {
      width: 180px;
      height: 36px;
      background: #ffc10a;
      box-shadow: 0px 2px 4px 0px rgba(255, 193, 10, 0.15);
      border-radius: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 36px;
    }
  }
}
</style>
