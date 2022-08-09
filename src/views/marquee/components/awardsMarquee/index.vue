<template>
  <nut-swiper
    class="awardsMarquee"
    :init-page="page4"
    :loop="true"
    auto-play="3000"
    direction="vertical"
    height="30"
    style="height: 30px"
  >
    <nut-swiper-item v-for="item in Array.from({ length: 3 })">
      <div class="user">
        <div class="avatar">
          <img
            src="https://ecmb.bdimg.com/tam-ogel/519917739_1170906296_367_252.jpg"
          />
        </div>
        <div class="txt">15220453577</div>
      </div>
    </nut-swiper-item>
  </nut-swiper>
</template>
<script lang="ts" setup name="Home">
import { ref, onMounted, getCurrentInstance, Ref } from 'vue';
import { useRouteQuery } from '@vueuse/router';
import useTheme from '@/utils/hooks/useTheme';

import { reactive, toRefs } from 'vue';
const state = reactive({
  page4: 0
});
const { page4 } = toRefs(state);
</script>
<style lang="scss" scoped>
.awardsMarquee {
  margin-top: 5px;

  .nut-swiper-item {
    line-height: 30px;
    .user {
      height: 30px;
      display: flex;
      align-items: center;
      .avatar {
        width: 22px;
        height: 22px;
        border-radius: 22px;
        overflow: hidden;
        margin-left: 20px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .txt {
        width: 181px;
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
