<template>
  <nut-noticebar
    class="awardsMarquee"
    direction="vertical"
    :height="30"
    :speed="5"
    :standTime="3000"
    :list="[]"
    :background="`rgba(251, 248, 220, 0)`"
    :color="`#D9500B`"
  >
    <div
      class="item"
      v-for="(item, index) in Array.from({ length: 3 })"
      :key="index"
    >
      <div class="user">
        <div class="avatar">
          <img
            src="https://ecmb.bdimg.com/tam-ogel/519917739_1170906296_367_252.jpg"
          />
        </div>
        <div class="txt">15220453577</div>
      </div>
    </div>
  </nut-noticebar>
</template>
<script lang="ts" setup name="awardsMarquee"></script>
<style lang="scss" scoped>
.marquee {
  width: 25px;
  // margin-left: 10px;
}
.awardsMarquee {
  margin-top: 5px;
  display: flex;
  .item {
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
