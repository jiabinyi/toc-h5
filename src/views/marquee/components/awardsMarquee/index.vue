<template>
  <nut-noticebar
    v-if="data.length"
    class="awardsMarquee"
    direction="vertical"
    :speed="10"
    :standTime="3000"
    :background="`rgba(251, 248, 220, 0)`"
    :color="`#D9500B`"
  >
    <div class="item" v-for="(item, index) in data" :key="index">
      <div class="user">
        <div class="avatar" v-if="item?.head_img_url">
          <img :src="item.head_img_url" />
        </div>
        <div class="txt">
          恭喜{{
            '"' + hideName(item.nick_name) + '"抽中' + (item.prize_name ?? '')
          }}
        </div>
      </div>
    </div>
  </nut-noticebar>
</template>

<script lang="ts" setup name="awardsMarquee">
interface Props {
  data: Array<any>
}
const props = defineProps<Props>()
const { data } = toRefs(props)
// 隐藏姓
const hideName: any = (name: any) => {
  name = name.length ? name.substring(0, 1) + '***' : '用户'
  return name
}
</script>
<style lang="scss" scoped>
.marquee {
  width: 25px;
  // margin-left: 10px;
}
.awardsMarquee {
  margin-top: 5px;
  display: flex;
  height: 30px !important;
  .item {
    height: 30px !important;
    line-height: 30px;
    margin-right: 20px;
    .user {
      height: 30px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      .avatar {
        width: 22px;
        height: 22px;
        border-radius: 22px;
        overflow: hidden;
        margin-left: 0px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .txt {
        margin-left: 3px;
        max-width: 181px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 17px;
        overflow: hidden;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    ::v-deep(.nut-swiper-pagination-vertical) {
      i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        &.active {
          height: 18px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
