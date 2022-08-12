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
        <div class="content">2022-05-12 19:00:00</div>
      </div>
    </div>
    <!--S 抽奖箱  -->
    <div class="lottery-main">
      <div class="lottery-content">
        <div class="marquee">
          <div class="marquee-item">
            <!-- 获奖人轮播  s-->
            <awards-marquee
              :data="activityData.cust_win_records"
            ></awards-marquee>
          </div>
        </div>
        <!-- 奖盘  s-->
        <nutbig-marquee
          :prize-list="prizeList"
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
      <div class="footer-content" v-if="tabIndex == 0">
        <div class="item">
          <div class="icon">
            <img src="@/common/assets/images/blue/invitation-icon.png" />
          </div>
          <div class="txt">
            <div class="title">每邀请一位好友参与</div>
            <div class="desc">免费次数 +1</div>
          </div>
          <div class="right">
            <div class="txt">进行中 (1/3)</div>
            <div class="btn">立即邀请</div>
          </div>
        </div>
      </div>
      <!-- 活动奖品 -->
      <div class="footer-content" v-if="tabIndex == 1">
        <div class="item">
          <div class="icon">
            <img src="@/common/assets/images/blue/invitation-icon.png" />
          </div>
          <div class="txt">
            <div class="title">每邀请一位好友参与</div>
            <div class="desc">免费次数 +1</div>
          </div>
          <div class="right">
            <div class="txt">进行中 (1/3)</div>
            <div class="btn">立即邀请</div>
          </div>
        </div>
      </div>
      <!-- 我的奖品 -->
      <div class="footer-content" v-if="tabIndex == 2">
        <div class="item">
          <div class="icon">
            <img src="@/common/assets/images/blue/invitation-icon.png" />
          </div>
          <div class="txt">
            <div class="title">每邀请一位好友参与</div>
            <div class="desc">免费次数 +1</div>
          </div>
          <div class="right">
            <div class="txt">进行中 (1/3)</div>
            <div class="btn">立即邀请</div>
          </div>
        </div>
      </div>
    </div>
    <component
      :is="dialogComponents[dialogName]"
      v-model:visible="dialogVisible"
    />
    <div class="test-contact">
      <div v-for="contact in contacts" :key="contact?.id">
        {{ contact?.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="marquee">
import { getContact } from '@/axios'
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
const contacts = ref([{}])
const { run } = useRequest(getContact, {
  onSuccess: (res: ResArrData) => {
    console.log(res.data)
    contacts.value = res?.data
  }
})
onMounted(() => {
  setLottery()
  run()
})
const dialogComponents: ObjTy = {
  dialogActivityRules,
  dialogNewUserAward,
  dialogPoster,
  dialogThanksParticipant,
  dialogTipActivityFinish,
  dialogAward
}
const dialogName = ref('dialogActivityRules')
const dialogVisible = ref(false)

/**
 * 展示活动规则
 * @param {Object} e
 */
const handleShowRules = () => {
  dialogName.value = 'dialogActivityRules'
  dialogVisible.value = true
}
const tabIndex = ref(0)
const tabs: Array<ObjTy> = [
  { name: '领取免费次数' },
  { name: '活动奖品' },
  { name: '我的奖品' }
]

// 选择的Tab
const handleActive = (index: number) => {
  tabIndex.value = index
}
const setLottery = () => {
  const lotteryBtn = document.getElementsByClassName('start')
  lotteryBtn[0].innerHTML = '立即抽奖'
}
const { proxy } = getCurrentInstance() as any
// 转盘上要展示的奖品数据
const prizeList = ref([
  {
    id: 'xiaomi',
    prizeName: '小米手机',
    prizeImg: 'https://ecmb.bdimg.com/tam-ogel/519917739_1170906296_367_252.jpg'
  },
  {
    id: 'blue',
    prizeColor: 'rgb(251, 219, 216)',
    prizeName: '蓝牙耳机',
    prizeImg:
      'https://img0.baidu.com/it/u=2636019359,707918449&fm=253&fmt=auto&app=138&f=JPG?w=500&h=318'
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img1.baidu.com/it/u=875176582,3483294321&fm=253&fmt=auto&app=138&f=PNG?w=260&h=170'
  },
  {
    id: 'apple',
    prizeName: 'apple watch',
    prizeImg:
      'https://img0.baidu.com/it/u=2794028064,3238991630&fm=253&fmt=auto&app=120&f=JPEG?w=526&h=500'
  },
  {
    id: 'fruit',
    prizeColor: 'rgba(246, 142, 46, 0.5)',
    prizeName: '苹果13 Pro',
    prizeImg:
      'https://t15.baidu.com/it/u=1719561931,2725603912&fm=224&app=112&size=h200&n=0&f=JPEG&fmt=auto?sec=1659632400&t=ed77d1daacd290bf4472dadf4b54605e'
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img2.baidu.com/it/u=1985555842,143515817&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667'
  },
  {
    id: 'fish',
    prizeName: '海鲜套餐',
    prizeImg:
      'https://img0.baidu.com/it/u=220318103,3593106031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667'
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg:
      'https://img2.baidu.com/it/u=1985555842,143515817&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667'
  }
])
// 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
const prizeIndex = ref(-1)
const startTurns = () => {
  const PRIZE_lIST_SIZE = prizeList.value.length
  prizeIndex.value = Math.floor(Math.random() * PRIZE_lIST_SIZE)
}
const endTurns = () => {
  proxy.$toast.text('喜从天降，运气爆棚，恭喜你中奖了！')
}

// 获取当前活动内容信息
const activityData: any = ref({
  participants_num: 0,
  cust_win_records: [],
  turn_prize_vos: []
}) // 变量-活动内容信息
const queryTurnActivity = async () => {
  const params = {
    url: api.queryTurnActivity,
    data: {}
  }
  const res: any = await http.get(params).catch(err => {
    proxy.$toast.text(err.result.msg)
  })
  if (res) {
    activityData.value = {
      participants_num: 0,
      cust_win_records: [],
      turn_prize_vos: [],
      ...res.data
    }
    activityData.turn_prize_vos.map((item: any) => ({
      prizeColor: '',
      prizeName: item.prize_name,
      prizeImg: item.prize_cover_url,
      ...item
    }))
  }
}

queryTurnActivity()
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
