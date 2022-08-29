<template>
  <nut-noticebar
    v-if="data.length"
    class="awards-marquee"
    direction="vertical"
    :speed="proxy.$pxFlexible(5)"
    :standTime="2000"
    :background="`rgba(251, 248, 220, 0)`"
    :color="`#D9500B`"
    :height="proxy.$pxFlexible(30)"
  >
    <div class="item" v-for="(item, index) in data" :key="index">
      <div class="user">
        <div class="avatar" v-if="item?.head_img_url">
          <img :src="item.head_img_url" />
        </div>
        <div class="txt">恭喜{{ '"' + hideName(item.nick_name) + '"抽中' + (item.prize_name ?? '') }}</div>
      </div>
    </div>
  </nut-noticebar>
</template>

<script lang="ts" setup name="AwardsMarquee">
export interface AwardProps {
  data: Array<any>
}
const Props = defineProps<AwardProps>()
const { data } = toRefs(Props)
// 隐藏名字
const hideName = (name: string): string => (name ? `${name.substring(0, 1)}***` : '用户')
const { proxy } = getCurrentInstance() as ObjTy
</script>
<style lang="scss" scoped>
.marquee {
  width: 25px;
}
.awards-marquee {
  margin-top: 5px;
  display: flex;
  height: 30px !important;
  overflow: hidden;
  .item {
    line-height: 30px;
    margin-right: 20px;
    .user {
      height: 30px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      .avatar {
        flex-shrink: 0;
        width: 22px;
        height: 22px;
        border-radius: 22px;
        overflow: hidden;
        margin-left: 0;
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

        font-weight: 500;
        color: #fff;
        line-height: 17px;
        overflow: hidden;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    :deep(.nut-swiper-pagination-vertical) {
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
