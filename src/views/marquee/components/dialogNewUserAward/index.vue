<template>
  <DialogCustom v-model:visible="visible" @close="emit('dialogNewUserAwardClose')">
    <div class="new-user-award-container">
      <div class="content" @click="accept" />
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="Home">
import { immediatelyReceive } from '@/axios'

import { sessions } from 'mosowejs'
import { useRequest } from 'vue-request'
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
  },
  activityData: {
    type: Object,
    default: () => new Object()
  }
})

// prop响应式
const emit = defineEmits(['update:visible', 'dialogNewUserAwardClose'])
const visible = useVModel(props, 'visible', emit)
const activityData = useVModel(props, 'activityData')

const accept = () => {
  runImmediatelyReceive({
    activityId: activityData.value.turn_activity.id,
    custId: sessions.get('cust_id')
  })
  visible.value = false
}
// 对象-组件代理
const { proxy } = getCurrentInstance() as any
// 领取
const { run: runImmediatelyReceive } = useRequest(immediatelyReceive, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      proxy.$toast.text('领取成功')
      emit('dialogNewUserAwardClose')
    }
    visible.value = false
  },
  onError: (error: any) => {
    proxy.$toast.text(error.result.msg)
    visible.value = false
    emit('dialogNewUserAwardClose')
  }
})
</script>
<style lang="scss" scoped>
.new-user-award-container {
  width: 316px;
  height: 398px;
  & .content {
    width: 100%;
    height: 100%;
    @include toc-images-background;
    background-image: url('/src/common/assets/images/blue/blue-dialog-new-user-award.png') !important;
  }
}
</style>
