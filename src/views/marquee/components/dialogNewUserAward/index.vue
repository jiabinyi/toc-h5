<template>
  <DialogCustom v-model:visible="visible">
    <div class="dialogNewUserAward"></div>
  </DialogCustom>
</template>
<script lang="ts" setup name="Home">
// 弹窗 首次奖励
import DialogCustom from '@/components/DialogCustom/index.vue'
const visible = ref(true)
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
