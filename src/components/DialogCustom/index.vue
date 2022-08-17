<template>
  <nut-dialog
    footer-direction="vertical"
    v-model:visible="visible"
    :noCancelBtn="true"
    :noOkBtn="true"
    :popStyle="{ background: 'rgba(0,0,0,0)', maxHeight: 'auto' }"
    pop-class="DialogCustom"
  >
    <div class="wrap">
      <slot></slot>
      <div class="closeBtn" @click="close" v-if="!hideCloseBtn">
        <img src="@/common/assets/images/blue/dialog-close-btn.png" />
      </div>
    </div>
  </nut-dialog>
</template>
<script lang="ts" setup name="Home">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  hideCloseBtn: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:visible', 'close'])
const visible = useVModel(props, 'visible', emit)
const close = () => {
  visible.value = false
  emit('close')
}
</script>
<style lang="scss">
.DialogCustom {
  padding: 0px;
  border-radius: 0px !important;
  .nut-dialog,
  .nut-dialog__content {
    padding: 0px;
    margin: 0px;
    width: auto;
    height: auto;
    max-height: 100% !important;
    max-width: 100% !important;
  }
  .wrap {
    .closeBtn {
      img {
        width: 40px;
        height: 66px;
      }
    }
  }
}
</style>
