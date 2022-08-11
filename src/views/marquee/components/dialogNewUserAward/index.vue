<template>
  <DialogCustom v-model:visible="visible">
    <div class="dialogNewUserAward"></div>
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
<style lang="scss">
.dialogNewUserAward {
  @include toc-images-background;
  background-image: var(--blue-dialog-new-user-award);
  width: 316px;
  height: 398px;
  display: block;
}
</style>
