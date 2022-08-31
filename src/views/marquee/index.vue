<template>
  <div class="lottery-container index-bg">
    <!--S 活动规则按钮  -->
    <div class="rule-btn" @click="handleShowRules">
      <div>活动</div>
      <div>规则</div>
    </div>
    <!--E 活动规则按钮  -->
    <div class="lottery-header">
      <div class="participants-btn">已有{{ activityData.participants_num }}人参与</div>
      <div class="activity-time" v-if="dialogName !== 'dialogTipActivityFinish'">
        <div class="content">{{ activityData.turn_activity.end_time }} 结束</div>
      </div>
    </div>
    <!--S 抽奖箱  -->
    <div class="lottery-main">
      <div class="lottery-content">
        <div class="marquee">
          <div class="marquee-item">
            <!-- 获奖人轮播  s-->
            <awards-marquee
              v-if="walkingLanternListData.cust_win_records"
              :data="walkingLanternListData.cust_win_records ?? []"
            ></awards-marquee>
          </div>
        </div>
        <div
          class="marquee-disable"
          @click="marqueeDisable"
          v-if="!['InternalError', 'Success'].includes(marqueeCheckResult.code)"
        ></div>
        <!-- 奖盘  s-->
        <nutbig-marquee
          v-if="showMarquee"
          :prize-list="activityData.turn_prize_vos"
          :prize-index="prizeIndex"
          :speed="15"
          :circle="20"
          @start-turns="startTurns"
          @end-turns="endTurns"
        >
        </nutbig-marquee>
      </div>
    </div>
    <!--E 抽奖箱  -->

    <!--S 底部抽奖统计  -->
    <div class="lottery-footer">
      <!-- tab s-->
      <div class="lottery-tab">
        <div
          :class="['lottery-tab-item', { 'active-tab': tabIndex === index }]"
          @click="handleActive(index)"
          v-for="(tab, index) in tabs"
          :key="tab.name"
        >
          <div class="lottery-tab-item-text">{{ tab.name }}</div>
        </div>
      </div>

      <!-- 领取免费次数 s-->
      <foot-task-list
        :activityTaskList="activityTaskListData"
        :inviteIfoData="inviteIfoData"
        :activityData="activityData"
        @goToShare="goToShare"
        v-if="tabIndex === 0"
      />
      <!-- 我的奖品 s-->
      <foot-award-list :myWinningList="myWinningListData" v-if="tabIndex === 1" />
    </div>
    <!--E 底部抽奖统计  -->

    <!--S 动态组件  -->
    <component
      :helpShareData="helpShareData"
      :is="dialogComponents[dialogName]"
      v-model:visible="dialogVisible"
      :data="dialogData"
      :inviteIfoData="inviteIfoData"
      :activityData="activityData"
      :prize="prizeCurrent"
      ref="refDialogComponent"
      @dialogNewUserAwardClose="dialogNewUserAwardClose"
      @dialogHelpFriendClose="dialogHelpFriendClose"
    />
  </div>
  <!--E 动态组件  -->
</template>
<script lang="ts" setup name="marquee">
import {
  queryTurnActivity,
  activityTaskList,
  queryTurnInviteFriends,
  myWinningList,
  turnLuckDraw,
  currentActivityAccount,
  walkingLanternList,
  turnLuckDrawCheck
} from '@/axios'

import { sessions } from 'mosowejs'
import { useRequest } from 'vue-request'
// 组件 底部获奖奖品列表
import footAwardList from './components/footAwardList/index.vue'
// 组件 底部任务列表
import footTaskList from './components/footTaskList/index.vue'
// 弹窗 活动规则
import dialogActivityRules from './components/dialogActivityRules/index.vue'
// 组件 获奖人跑马灯
import awardsMarquee from './components/awardsMarquee/index.vue'
// 弹窗 首次奖励
import dialogNewUserAward from './components/dialogNewUserAward/index.vue'
// 弹窗 海报
import dialogPoster from './components/dialogPoster/index.vue'
// 弹窗 谢谢参与
import dialogThanksParticipant from './components/dialogThanksParticipant/index.vue'
// 弹窗 活动结束
import dialogTipActivityFinish from './components/dialogTipActivityFinish/index.vue'
// 弹窗 恭喜中奖
import dialogAward from './components/dialogAward/index.vue'
// 弹窗 助力
import dialogHelpFriend from './components/dialogHelpFriend/index.vue'
import useGetQuery from '@/utils/hooks/useGetQuery'
const { proxy } = getCurrentInstance() as any
const dayjs = proxy.$dayjs
const { getUrlParam } = useGetQuery()

// 变量-弹窗数据
const dialogData = ref({})
// 集合-弹窗
const dialogComponents: ObjTy = {
  dialogActivityRules,
  dialogNewUserAward,
  dialogPoster,
  dialogThanksParticipant,
  dialogTipActivityFinish,
  dialogAward,
  dialogHelpFriend
}
// 变量-弹窗名
const dialogName = ref('dialogActivityRules')
// 变量-显示弹窗
const dialogVisible = ref(false)
const refDialogComponent = ref()

/**
 * 展示活动规则
 * @param {Object} e
 */
const handleShowRules = () => {
  dialogName.value = 'dialogActivityRules'
  dialogVisible.value = true
  dialogData.value = activityData.value?.turn_activity
}

/**
 * 去分享
 * @author yijiabin
 * @date 2022-08-29
 * @param {any} {}
 * @returns {any}
 */
const helpShareData = ref({})
const goToShare = (item: any) => {
  if (!activityData.value.join_flag) {
    proxy.$toast.text('暂无分享权限', { duration: 1500 })
    return
  }
  helpShareData.value = item
  dialogName.value = 'dialogPoster'
  dialogData.value = inviteIfoData.value
  dialogVisible.value = true

  setTimeout(() => {
    refDialogComponent.value.renderPoster()
  }, 200)
}
// 变量-tab栏 index
const tabIndex = ref(0)
// 枚举-tab栏菜单
const tabs: Array<ObjTy> = [
  { name: '领取免费次数' },
  // { name: '活动奖品' },
  { name: '我的奖品' }
]

// 选择的Tab
const handleActive = (index: number) => {
  tabIndex.value = index
}

/**
 * 设置转盘按钮
 * @author yijiabin
 * @date 2022-08-29
 * @returns {any}
 */
const setLottery = () => {
  if (!showMarquee.value) {
    return
  }
  const lotteryBtn = document.getElementsByClassName('start')
  lotteryBtn[0].innerHTML = `<div class="txt">立即抽奖</div><div class="num-txt">(${
    curActivityAccountData.value?.activity_account?.loot_ticket_num ?? 0
  }次)</div>`
  remoteGiftSelected()
}
// 去除默认抽中奖品样式
const remoteGiftSelected = () => {
  nextTick(() => {
    const gift1 = document.querySelector('.nutbig-marquee  li.active') as ObjTy
    if (gift1) {
      gift1.classList.remove('active')
    }
  })
}
// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(-1)
const startTurns = () => {
  prizeCurrent.value = {}
  prizeIndex.value = -1
  turnLuckDrawFunc({
    activityId: activityData.value.turn_activity.id,
    custId: sessions.get('cust_id')
  })
}

/**
 * 抽奖结果
 * @author yijiabin
 * @date 2022-08-29
 * @returns {any}
 */

const endTurns = () => {
  getMyWinningList()

  runTurnLuckDrawCheck({
    activityId: activityData.value.turn_activity.id,
    userId: sessions.get('cust_id')
  })
  // 判断是否谢谢参与
  const choice_prize_name = String(prizeCurrent.value.choice_prize_name).replaceAll(/\s/g, '')
  if (choice_prize_name === '谢谢参与') {
    dialogName.value = 'dialogThanksParticipant'
    dialogVisible.value = true
  } else {
    dialogName.value = 'dialogAward'
    dialogData.value = prizeCurrent.value
    dialogVisible.value = true
  }
  remoteGiftSelected()
}
// 接口-常量-活动详情
interface ActivityData {
  participants_num: number
  cust_win_records: Array<ObjTy>
  turn_prize_vos: Array<ObjTy>
  turn_activity: ObjTy
  turn_invite_friends_vos: ObjTy
  receive_flag: boolean
  join_flag: boolean
  end_time: any
}

// 常量-活动详情
const activityData = ref({
  receive_flag: false,
  participants_num: 0,
  cust_win_records: [],
  turn_prize_vos: [],
  turn_activity: {},
  turn_invite_friends_vos: {},
  join_flag: false,
  end_time: ''
} as ActivityData)

const showMarquee = ref(false)

// 领取免费次数任务列表
const activityTaskListData = ref({} as any) // 变量-免费次数任务列表
const { run: getActivityTaskList } = useRequest(activityTaskList, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      activityTaskListData.value = res.data
    }
  }
})

// 当前活动的账户查询
const curActivityAccountData = ref({} as any) // 变量-免费次数任务列表
const { run: runCurActivityAccount } = useRequest(currentActivityAccount, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      curActivityAccountData.value = res.data
      setLottery()
    }
  }
})

// 获取分享文案信息
const inviteIfoData = ref({} as any) // 变量-分享文案
const { run: getInviteIfo } = useRequest(queryTurnInviteFriends, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      inviteIfoData.value = res.data
    }
  }
})
// 小程序-幸运大转盘分页获取我的中奖列表
const myWinningListData = ref({} as any) // 变量-中奖列表
const { run: getMyWinningList } = useRequest(myWinningList, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      myWinningListData.value = res.data
    }
  }
})

// 小程序-幸运大转盘分页获取我的中奖列表
const walkingLanternListData = ref({} as any) // 变量-中奖列表
const { run: runWalkingLanternList } = useRequest(walkingLanternList, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      walkingLanternListData.value = res.data
    }
  }
})

// 速度
const marqueeSpeed = ref(5)
// 抽奖效验结果
const marqueeCheckResult = ref({} as ObjTy)
marqueeCheckResult.value = { code: 'Success' }

/**
 * 幸运大转盘抽奖前校验
 * @author yijiabin
 * @date 2022-08-29
 * @param {any} turnLuckDrawCheck
 * @param {any} {manual:true
 * @param {any} onSuccess:(res:ResObjData
 * @returns {any}
 */
const { run: runTurnLuckDrawCheck } = useRequest(turnLuckDrawCheck, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res.result) {
      if (res.result?.code !== 'Success') {
        marqueeSpeed.value = 0
      } else {
        marqueeSpeed.value = 0
      }
      marqueeCheckResult.value = res.result
    }
  },
  onError: (res: ObjTy) => {
    if (res.result && res.result.code !== 'systemBusy') {
      marqueeCheckResult.value = res.result
    }
  }
})

// 当前获奖奖品
const prizeCurrent = ref({} as ObjTy)

/**
 * 小程序-幸运大转盘抽奖
 * @author yijiabin
 * @date 2022-08-29
 * @param {any} turnLuckDraw
 * @param {any} {manual:true
 * @param {any} onSuccess:(res:ResObjData
 * @returns {any}
 */
const { run: turnLuckDrawFunc } = useRequest(turnLuckDraw, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    getActive()
    runCurActivityAccount()
    getActivityTaskList()
    if (res) {
      activityData.value.turn_prize_vos.findIndex((prize: any, index: any) => {
        const isThis = index + 1 === Number(res.data.award_location)
        if (isThis) {
          setTimeout(() => {
            prizeCurrent.value = res.data
            prizeIndex.value = index
          }, 500)
        }
        return isThis
      })
    }
  },
  onError: (error: any) => {
    proxy.$toast.text(error.result.msg)
    showMarquee.value = false
    setTimeout(() => {
      showMarquee.value = true
      nextTick(() => {
        setLottery()
      })
    }, 100)
  }
})

/**
 * 活动结束-回首页
 * @author yijiabin
 * @date 2022-08-23
 * @returns {any}
 */
const activityFinished = () => {
  dialogData.value = { txt: '当前活动已结束' }
  dialogName.value = 'dialogTipActivityFinish'
  dialogVisible.value = true
}
// 常量-是否已领取首次奖励
const NewUserAward = ref(false)
// 常量-是否已助力
const dialogHelpFriendHadPop = ref(false)

/**
 * 请求-活动内容信息
 * @author yijiabin
 * @date 2022-08-29
 * @param {any} queryTurnActivity
 * @param {any} {manual:true
 * @param {any} onSuccess:(res:ResObjData
 * @returns {any}
 */
const { run: getActive } = useRequest(queryTurnActivity, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    afterGetActive(res)
  },
  onError: (error: any) => {
    if (error?.result?.code === 'MallFailure.CurrentTurnActivityNotExist') {
      dialogData.value = { txt: error?.result?.msg }
      dialogName.value = 'dialogTipActivityFinish'
      dialogVisible.value = true
    }
  }
})

/**
 * 获取活动详情后数据处理与响应
 * @author yijiabin
 * @date 2022-08-29
 * @param {any} res:ObjTy
 * @returns {any}
 */
const afterGetActive = (res: ObjTy) => {
  if (res) {
    const turn_prize_vos = res?.data?.turn_prize_vos?.map((item: ObjTy) => ({
      prizeColor: '',
      prizeName: item.prize_name,
      prizeImg: item.prize_cover_url,
      ...item
    }))
    // 活动详情
    activityData.value = {
      ...toRefs(activityData.value),
      ...res.data,
      turn_prize_vos
    }
    // 幸运大转盘抽奖校验
    runTurnLuckDrawCheck({
      activityId: activityData.value.turn_activity.id,
      userId: sessions.get('cust_id')
    })
    const activityId = sessions.get('activityId')
    //  判断分享景来的活动是否已过期
    if (sessions.get('activityId') !== '' && activityId !== activityData.value.turn_activity.id) {
      activityFinished()
      return
    }
    // 活动结束 回首页
    const now = new Date().getTime()
    if (dayjs(activityData.value.turn_activity.end_time).valueOf() < now) {
      activityFinished()
      return
    }
    // 显示抽奖盘
    showMarquee.value = true

    setTimeout(() => {
      setLottery()
    }, 100)
    // 获取分享文案信息
    getInviteIfo({
      activityId: activityData.value.turn_activity.id,
      fissionType: 1
    })

    // 判断是否需助力
    if (getUrlParam('userId')?.length && !dialogHelpFriendHadPop.value) {
      dialogName.value = 'dialogHelpFriend'
      dialogVisible.value = true
      dialogHelpFriendHadPop.value = true
    } else if (activityData.value.receive_flag) {
      if (activityData.value.join_flag && !NewUserAward.value) {
        dialogName.value = 'dialogNewUserAward'
        dialogVisible.value = true
      }
    }
  }
}

/**
 * 帮好友助力后回调
 * @author yijiabin
 * @date 2022-08-29
 * @returns {any}
 */
const dialogHelpFriendClose = () => {
  dialogVisible.value = false
  runCurActivityAccount()
  // 判断是否已领取
  if (activityData.value.receive_flag) {
    setTimeout(() => {
      // 判断是否有参与权限
      if (activityData.value.join_flag && !NewUserAward.value) {
        dialogName.value = 'dialogNewUserAward'
        dialogVisible.value = true
      }
    }, 1000)
  }
}

/**
 * 领取免费次数
 * @author yijiabin
 * @date 2022-08-29
 * @returns {any}
 */
const dialogNewUserAwardClose = () => {
  NewUserAward.value = true
  getActive()
  runCurActivityAccount()
}

/**
 * 无法抽奖提示
 * @author yijiabin
 * @date 2022-08-29
 * @returns {any}
 */
const marqueeDisable = () => {
  const shareTask = activityTaskListData.value.find((item: ObjTy) => item.fission_type === 1) || {}
  // 判断是否抽奖次数是否0和活动分享是否有可用次数
  if (
    curActivityAccountData.value?.activity_account?.loot_ticket_num === 0 &&
    shareTask.be_help_num < shareTask.cycle_daily_limit_num
  ) {
    proxy.$toast.text('做任务获取更多抽奖次数')
    return
  }
  proxy.$toast.text(marqueeCheckResult.value.msg)
}

onMounted(() => {
  getActive()
  getActivityTaskList()
  getMyWinningList()
  runWalkingLanternList()
  runCurActivityAccount()
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
