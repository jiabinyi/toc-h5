<template>
  <div class="footer-content">
    <div v-for="(item, index) in activityTaskList" :key="index">
      <div class="item" v-if="inviteIfoData?.open_flag === 0">
        <div class="icon">
          <img :src="item.task_icon_url" />
        </div>
        <div class="content">
          <div class="title">
            <div class="name">
              {{
                item.task_content_title.length > 9
                  ? item.task_content_title.substr(0, 9) + '...'
                  : item.task_content_title
              }}
            </div>
            x
            <div class="num">{{ item.reward_type_value }}</div>
          </div>
          <div class="desc">
            {{ item.guide_copy }}
          </div>
        </div>
        <div class="right">
          <div class="txt" v-if="item.be_help_num < item.cycle_daily_limit_num">
            进行中 ({{ item.be_help_num }}/{{ item.cycle_daily_limit_num }})
          </div>

          <div class="txt" v-if="item.be_help_num >= item.cycle_daily_limit_num">任务已完成</div>

          <div class="btn" @click="emit('goToShare', item)" :class="{ disable: !activityData.join_flag }">
            {{ item.button_copy }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="inviteIfoData?.open_flag !== 0">
      <nut-empty description="暂无任务信息~">
        <template #image>
          <img src="@/common/assets/images/blue/blue-no-data.png" />
        </template>
      </nut-empty>
    </div>
  </div>
</template>

<script lang="ts" setup name="footTaskList">
export interface AwardProps {
  activityTaskList: ObjTy // 活动任务列表
  inviteIfoData: ObjTy // 分享文案信息
  activityData: ObjTy // 活动详情
}
const Props = defineProps<AwardProps>()
const { activityTaskList, inviteIfoData, activityData } = toRefs(Props)
const emit = defineEmits(['goToShare'])
</script>
<style lang="scss" scoped></style>
