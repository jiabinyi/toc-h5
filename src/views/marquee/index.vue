<template>
  <div class="lottery-container index-bg">
    <!--S 活动规则按钮  -->
    <div class="rule-btn" @click="handleShowRules">
      <div>活动</div>
      <div>规则</div>
    </div>
    <!--E 活动规则按钮  -->
    <div class="lottery-header">
      <div class="participants-btn">
        已有{{ activityData.participants_num }}人参与
      </div>
      <div class="activity-time">
        <div class="content">{{ activityData.turn_activity.end_time }}</div>
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
          v-if="curActivityAccountData?.activity_account?.loot_ticket_num == 0"
        ></div>
        <!-- 奖盘  s-->
        <nutbig-marquee
          v-if="showMarquee"
          :prize-list="activityData.turn_prize_vos"
          :prize-index="prizeIndex"
          :speed="150"
          :circle="40"
          @start-turns="startTurns"
          @end-turns="endTurns"
        >
        </nutbig-marquee>
      </div>
    </div>
    <!--E 抽奖箱  -->

    <!--S 底部抽奖统计  -->
    <div class="lottery-footer">
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
      <!-- 领取免费次数 -->
      <div class="footer-content" v-if="tabIndex === 0">
        <div v-for="(item, index) in activityTaskListData" :key="index">
          <div class="item" v-if="inviteIfoData?.open_flag === 0">
            <div class="icon">
              <img :src="item.task_icon_url" />
            </div>
            <div class="txt">
              <div class="title">
                {{
                  item.task_content_title.length > 12
                    ? item.task_content_title.substr(0, 12) + '...'
                    : item.task_content_title
                }}
                x{{ item.reward_type_value }}
              </div>
              <div class="desc">
                {{ item.guide_copy }}
              </div>
            </div>
            <div class="right">
              <div
                class="txt"
                v-if="item.be_help_num < item.cycle_daily_limit_num"
              >
                进行中 ({{ item.be_help_num }}/{{ item.cycle_daily_limit_num }})
              </div>

              <div
                class="txt"
                v-if="item.be_help_num >= item.cycle_daily_limit_num"
              >
                任务已完成
              </div>

              <div
                class="btn"
                @click="goToShare(item)"
                :class="{ disable: !activityData.join_flag }"
              >
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

      <!-- 我的奖品 -->
      <div class="footer-content" v-if="tabIndex === 1">
        <div v-for="(item, index) in myWinningListData" :key="index">
          <div class="item">
            <div class="icon">
              <img :src="item.pic_url" />
            </div>
            <div class="txt">
              <div class="title">
                {{ item.choice_prize_name }}：{{ item.prize_name }} x {{ 1 }}份
              </div>
              <div class="desc">
                {{ dayjs(item?.win_time).format('YYYY年MM月  HH:mm') }}
              </div>
            </div>
            <div class="right">
              <div
                class="btn"
                v-if="!item.order_no && !item.overtime_flag"
                @click="placeOrder(item)"
              >
                立即下单
              </div>
              <div class="btn" v-if="item.order_no">查看订单</div>
              <div class="btn disable" v-if="item.overtime_flag">
                超时未下单
              </div>
            </div>
          </div>
        </div>

        <div v-if="!myWinningListData.length">
          <nut-empty description="暂无中奖信息~">
            <template #image>
              <img src="@/common/assets/images/blue/blue-no-data.png" />
            </template>
          </nut-empty>
        </div>
      </div>
    </div>
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
</template>
<script lang="ts" setup name="marquee">
import {
  getContact,
  queryTurnActivity,
  activityTaskList,
  queryTurnInviteFriends,
  myWinningList,
  turnLuckDraw,
  currentActivityAccount,
  walkingLanternList
} from '@/axios'

import { sessions } from 'mosowejs'
import { useRequest } from 'vue-request'
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

const { proxy, appContext } = getCurrentInstance() as any

const dayjs = appContext.config.globalProperties.$dayjs

import useGetQuery from '@/utils/hooks/useGetQuery'

const { getUrlParam } = useGetQuery()
// 变量-联系人
interface Contact {
  id: number
  name: string
}
const contacts = ref([] as Contact[])
// 请求-联系人
const { run: getContactRequest } = useRequest(getContact, {
  manual: true,
  onSuccess: (res: ResArrData) => {
    console.log(res.data)
    contacts.value = res?.data as Contact[]
  }
})

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
// 设置转盘
const setLottery = () => {
  if (!showMarquee.value) {
    return
  }
  const lotteryBtn = document.getElementsByClassName('start')
  lotteryBtn[0].innerHTML = `<div class="txt">立即抽奖</div><div class="num-txt">(${
    curActivityAccountData.value?.activity_account?.loot_ticket_num ?? 0
  }次)</div>`
}

// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(-1)
const startTurns = () => {
  prizeCurrent.value = {}
  prizeIndex.value = -1
  turnLuckDrawFunc({
    activityId: activityData.value.turn_activity.id,
    custId: JSON.parse(sessions.get('userInfo')).cust_id
  })
}
const endTurns = () => {
  getMyWinningList()
  if (
    String(prizeCurrent.value.choice_prize_name).replaceAll(/\s/g, '') ===
    '谢谢参与'
  ) {
    // proxy.$toast.text('喜从天降，运气爆棚，恭喜你中奖了！')
    dialogName.value = 'dialogThanksParticipant'
    dialogVisible.value = true
  } else {
    dialogName.value = 'dialogAward'
    dialogData.value = prizeCurrent.value
    dialogVisible.value = true
  }
}

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

// 获取当前活动内容信息
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
const { run: runDalkingLanternList } = useRequest(walkingLanternList, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      walkingLanternListData.value = res.data
    }
  }
})
// 当前获奖奖品
const prizeCurrent = ref({} as any)

// 小程序-幸运大转盘抽奖
const { run: turnLuckDrawFunc } = useRequest(turnLuckDraw, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      activityData.value.turn_prize_vos.findIndex((prize: any, index: any) => {
        getActivityTaskList()

        if (prize.id === res.data.id) {
          prizeCurrent.value = res.data
          prizeIndex.value = index
          return true
        }
        return false
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
 * 下单
 * @author yijiabin
 * @date 2022-08-16
 * @param {any} {category_code
 * @param {any} goods_id}:any
 * @returns {any}
 */

const placeOrder = async ({ category_code, goods_id, id }: ObjTy) => {
  const url = `/pages/activity/pages/goodDetail/goodDetail?category_code=${category_code}&activityGoodId=${id}&goods_id=${goods_id}&type=marquee`
  const wx = await import('wechat-ts-sdk').then(module => module.default)
  wx.miniProgram.navigateTo({ url }) // 跳到小程序原生页面
}
// 常量 是否已助力
const dialogHelpFriendHadPop = ref(false)
// 请求-活动内容信息
const { run: getActive } = useRequest(queryTurnActivity, {
  manual: true,
  onSuccess: (res: ResObjData) => {
    if (res) {
      const turn_prize_vos = res?.data?.turn_prize_vos?.map((item: ObjTy) => ({
        prizeColor: '',
        prizeName: item.prize_name,
        prizeImg: item.prize_cover_url,
        ...item
      }))
      // 活动详情
      activityData.value = {
        ...JSON.parse(JSON.stringify(activityData.value)),
        ...res.data,
        turn_prize_vos
      }
      showMarquee.value = true
      // 活动结束 回首页
      if (new Date(activityData.value.end_time) > new Date()) {
        dialogName.value = 'dialogTipActivityFinish'
        dialogVisible.value = true
        dialogName.value = 'dialogTipActivityFinish'
        dialogVisible.value = true
        return
      }
      setTimeout(() => {
        setLottery()
      }, 100)
      // 获取分享文案信息
      getInviteIfo({
        activityId: activityData.value.turn_activity.id,
        fissionType: 1
      })

      // 判断是否需助力
      if (activityData.value.join_flag) {
        if (getUrlParam('userId')?.length && !dialogHelpFriendHadPop.value) {
          dialogName.value = 'dialogHelpFriend'
          dialogVisible.value = true
          dialogHelpFriendHadPop.value = true
        } else if (activityData.value.receive_flag) {
          dialogName.value = 'dialogNewUserAward'
          dialogVisible.value = true
        }
      }
    }
  },
  onError: (error: any) => {
    if (error?.result?.code === 'MallFailure.CurrentTurnActivityNotExist') {
      proxy.$toast.text(error?.result?.msg, { duration: 1500000 })
    }
  }
})

// 帮好友助力后
const dialogHelpFriendClose = () => {
  dialogVisible.value = false
  if (activityData.value.receive_flag) {
    dialogName.value = 'dialogNewUserAward'
    dialogVisible.value = true
    runCurActivityAccount()
  }
}

// 领取免费次数
const dialogNewUserAwardClose = () => {
  getActive()
  runCurActivityAccount()
}
// 无法抽奖提示
const marqueeDisable = () => {
  proxy.$toast.text('你已经超过抽奖次数限制')
}
onMounted(() => {
  getContactRequest()
  getContactRequest()
  getActive()
  getActivityTaskList()
  getMyWinningList()
  runDalkingLanternList()
  runCurActivityAccount()
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
