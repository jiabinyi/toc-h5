<template>
  <div class="lottery-container index-bg">
    <!--S 活动规则按钮  -->
    <div class="rule-btn">
      <div>活动</div>
      <div>规则</div>
    </div>
    <!--E 活动规则按钮  -->
    <div class="lottery-header">
      <div class="participants-btn">已有200人参与</div>
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
            <awards-marquee></awards-marquee>
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
    <!--E 抽奖信息  -->
    <!-- S 弹窗 首次奖励 -->
    <dialogNewUserAward
      v-model:visible="dialogNewUserAwardVisible"
    ></dialogNewUserAward>
    <!-- E 弹窗 首次奖励 -->
    <!-- S 弹窗 海报 -->
    <dialogPoster v-model:visible="dialogPosterVisible"></dialogPoster>
    <!-- E 弹窗 海报 -->
  </div>
</template>
<script lang="ts" setup name="Home">
import { ref, onMounted, getCurrentInstance, Ref } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import useTheme from '@/utils/hooks/useTheme'
// 获奖人轮播
import awardsMarquee from './components/awardsMarquee/index.vue'
// 弹窗 首次奖励
import dialogNewUserAward from './components/dialogNewUserAward/index.vue'
// 弹窗 海报
import dialogPoster from './components/dialogPoster/index.vue'
onMounted(() => {
  const theme = useRouteQuery('theme') as Ref<string>
  const { setBodyClassName } = useTheme()
  setBodyClassName(theme.value ?? 'green')
  setLottery()
})
const tabIndex = ref(0)
const tabs: Array<ObjTy> = [
  { name: '领取免费次数' },
  { name: '活动奖品' },
  { name: '我的奖品' }
]
const dialogNewUserAwardVisible = ref(false)
const dialogPosterVisible = ref(true)

// 选择的Tab
const handleActive = (index: number) => {
  tabIndex.value = index
}
const setLottery = () => {
  const lotteryBtn = document.getElementsByClassName('start')
  lotteryBtn[0].innerHTML = '立即抽奖'
}
const { proxy } = getCurrentInstance() as { proxy: any }

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
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
