<template>
  <div class="footer-content">
    <div v-for="(item, index) in myWinningList" :key="index">
      <div class="item">
        <div class="icon">
          <img :src="item.pic_url" />
        </div>
        <div class="content">
          <div class="title">
            {{ item.choice_prize_name }}：{{
              item.prize_name.length > 7 ? item.prize_name.substr(0, 5) + '...' : item.prize_name
            }}
            x {{ 1 }}份
          </div>
          <div class="desc">
            {{ dayjs(item?.win_time).format('YYYY年MM月  HH:mm') }}
          </div>
        </div>
        <div class="right">
          <div class="btn" v-if="!item.order_code && !item.overtime_flag" @click="placeOrder(item)">立即下单</div>
          <div class="btn" v-if="item.order_code" @click="seeOrderDetail(item)">查看订单</div>
          <div class="btn disable" v-if="!item.order_code && item.overtime_flag">超时未下单</div>
        </div>
      </div>
    </div>

    <div v-if="!myWinningList.length">
      <nut-empty description="暂无中奖信息~">
        <template #image>
          <img src="@/common/assets/images/blue/blue-no-data.png" />
        </template>
      </nut-empty>
    </div>
  </div>
</template>

<script lang="ts" setup name="footTaskList">
export interface AwardProps {
  myWinningList: Array<any> // 活动任务列表
}
const Props = defineProps<AwardProps>()
const { myWinningList } = toRefs(Props)
const { proxy } = getCurrentInstance() as any
const dayjs = proxy.$dayjs

/**
 * 下单
 * @author yijiabin
 * @date 2022-08-16
 * @param {any} {category_code
 * @param {any} goods_id}:any
 * @returns {any}
 */

const placeOrder = async ({ category_code, goods_id, id, prize_goods_id }: ObjTy) => {
  const url = `/pages/activity/pages/goodDetail/goodDetail?category_code=${category_code}&activityGoodId=${id}&goods_id=${goods_id}&type=marquee&prizeGoodsId=${prize_goods_id}`
  console.log('url', url)
  const wx = await import('wechat-ts-sdk').then(module => module.default)
  wx.miniProgram.navigateTo({ url }) // 跳到小程序原生页面
}

/**
 * 查看订单详情
 * @author yijiabin
 * @date 2022-08-29
 * @param {any} prize:any
 * @returns {any}
 */
const seeOrderDetail = async (prize: ObjTy) => {
  const page =
    prize.category_code === 'PACKAGE_GOODS' ? 'orderMealDetail/orderMealDetail' : 'orderTicketDetail/orderTicketDetail'
  const url = `/pages/subTicket/pages/${page}?order_no=${prize.order_code}&media_type=SUB_ORDER_NO`
  console.log('url', url)
  const wx = await import('wechat-ts-sdk').then(module => module.default)
  wx.miniProgram.navigateTo({ url }) // 跳到小程序原生页面
}
</script>
<style lang="scss">
.footer-content {
  .nut-empty-image {
    height: auto;
  }
}
</style>
