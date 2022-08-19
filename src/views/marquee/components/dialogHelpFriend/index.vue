<template>
  <DialogCustom
    v-model:visible="visible"
    @close="emit('dialogHelpFriendClose')"
  >
    <div class="dialogHelpFriend" @click="accept"></div>
  </DialogCustom>
</template>
<script lang="ts" setup name="Home">
import { helpFriends } from '@/axios'

import { sessions } from 'mosowejs'
import { useRequest } from 'vue-request'
// 弹窗 首次奖励
import DialogCustom from '@/components/DialogCustom/index.vue'
import useGetQuery from '@/utils/hooks/useGetQuery'
const { getUrlParam } = useGetQuery()
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
const emit = defineEmits(['update:visible', 'dialogHelpFriendClose'])
const visible = useVModel(props, 'visible', emit)
const activityData = useVModel(props, 'activityData')

// 幸运大转盘助力好友
const { run: runHelpFriends } = useRequest(helpFriends, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      proxy.$toast.text('助力成功！')
      emit('dialogHelpFriendClose')
    }
    visible.value = false
  },
  onError: (error: any) => {
    proxy.$toast.text(error.result.msg)
    if (error.result.code === 'systemBusy') {
      return
    }
    visible.value = false
  }
})
const accept = () => {
  runHelpFriends({
    activityId: activityData.value.turn_activity.id,
    helpUserId: getUrlParam('userId'),
    userId: sessions.get('cust_id')
  })
}
// 对象-组件代理
const { proxy } = getCurrentInstance() as any
</script>
<style lang="scss">
.dialogHelpFriend {
  @include toc-images-background;
  background-image: var(--blue-dialog-help-friend);
  width: 316px;
  height: 398px;
  display: block;
}
</style>
