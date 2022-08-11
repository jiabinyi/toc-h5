<template>
  <DialogCustom v-model:visible="visible" hideCloseBtn>
    <div class="dialogAward">
      <div class="content"></div>

      <div class="line"></div>
      <div class="btn" @click="visible = false">我知道了</div>
      <img
        @click="visible = false"
        class="btn-close"
        src="@/common/assets/images/blue/blue-dialog-close.png"
      />
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="Home">
// 弹窗 首次奖励
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
<style lang="scss" scoped>
.dialogAward {
  text-align: center;
  .content {
    @include toc-images-background;
    background-image: var(--blue-dialog-award-bg);
    width: 316px;
    height: 428px;
    display: block;
  }
  .line {
    margin: 0px auto;
    width: 3px;
    height: 24px;
    background: #ffc10a;
  }
  .btn {
    margin: 0px auto;
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
  .btn-close {
    margin-top: 30px;
    width: 40px;
    height: 40px;
  }
}
</style>
