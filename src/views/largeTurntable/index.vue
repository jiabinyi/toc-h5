<template>
  <div class="lottery-container index-bg">
    <div class="lottery-header"></div>
    <div class="lottery-main">
      <div class="lottery-content">
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
    <div class="lottery-footer">
      <div class="lottery-tab"></div>
    </div>
  </div>
</template>
<script lang="ts" setup name="Home">
import { useRouteQuery } from '@vueuse/router'
import useTheme from '@/utils/hooks/useTheme'
onMounted(() => {
  const theme = useRouteQuery('theme')
  const { setBodyClassName } = useTheme()
  setBodyClassName(theme.value ?? 'green')
  setLottery()
})
const setLottery = () => {
  const lotteryBtn = document.getElementsByClassName('start')
  lotteryBtn[0].innerHTML = '立即抽奖'
}
const { proxy } = getCurrentInstance()

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
  const PRIZE_lIST_SIZE: number = prizeList.value.length
  prizeIndex.value = Math.floor(Math.random() * PRIZE_lIST_SIZE)
}
const endTurns = () => {
  proxy.$toast.text('喜从天降，运气爆棚，恭喜你中奖了！')
}
</script>
<style lang="scss" scoped>
.lottery-container {
  & .lottery-header {
    width: 100vw;
    height: 216px;
  }
  & .lottery-main {
    display: flex;
    justify-content: center;
    align-items: center;
    .lottery-content {
      width: 345px;
      height: 423px;
      @include toc-images-background;
      background-image: var(--lottery-main-bg) !important;
    }
  }
  :deep(.nutbig-marquee) {
    margin-top: 95px;
  }
  :deep(.bgContent) {
    background: none;
  }
  :deep(.marqueeBg) {
    background: none !important;
  }
  :deep(.start) {
    @include lottery-btn-bg;
    background: var(--lottery-btn-default) no-repeat;
    position: relative;
    text-align: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    line-height: 98px;
    top: 5px;
    left: 4px;
  }
  :deep(.disabledDraw) {
    @include lottery-btn-bg;
    background: var(--lottery-btn-disabled) no-repeat;
    color: black;
  }
  :deep(ul) {
    & li {
      width: 100px;
      height: 100px;
      @include toc-images-background;
      background-image: var(--marquee-item);
    }
    & .gift-1,
    .gift-2,
    .gift-3 {
      top: 0px;
    }
    & .gift-4,
    .gift-8 {
      top: 105px;
    }
    & .gift-5,
    .gift-6,
    .gift-7 {
      top: 210px;
    }
    & .gift-1,
    .gift-7,
    .gift-8 {
      left: 0px;
    }
    & .gift-2,
    .gift-6 {
      left: 103px;
    }
    & .desc {
      font-size: 14px;
      font-weight: 400;
      color: var(--lottery-desc-color);
    }
    & .gift-img {
      width: 64px;
      height: 48px;
      & img {
        object-fit: cover;
      }
    }
  }
  :deep(.active) {
    background: rgba(232, 243, 255, 0.32);
    box-shadow: 0px 2px 5px 0 rgba(232, 243, 255, 0.32);
    border-radius: 6px;
    color: #000;
    font-weight: 500;
  }
  & .lottery-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 29px;
    & .lottery-tab {
      width: 288px;
      height: 40px;
      @include toc-images-background;
      background-image: var(--receive-tab) !important;
    }
  }
}
</style>
