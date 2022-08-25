<template>
  <DialogCustom v-model:visible="visible" hideCloseBtn>
    <div class="dialog-award">
      <div class="content">
        <div class="img">
          <img @click="visible = false" :src="prize.pic_url" />
        </div>
        <div class="txt">{{ prize.choice_prize_name }}： {{ prize.prize_name }}</div>
      </div>

      <div class="line"></div>
      <div class="btn" @click="visible = false">我知道了</div>
      <img @click="visible = false" class="btn-close" src="@/common/assets/images/blue/blue-dialog-close.png" />
    </div>
  </DialogCustom>
</template>
<script lang="ts" setup name="DialogAward">
// 弹窗 首次奖励
import DialogCustom from '@/components/DialogCustom/index.vue'
const props = defineProps({
  // 变量-显示隐藏弹窗
  visible: {
    type: Boolean,
    default: false
  },
  // 数据-活动规则
  prize: {
    type: Object,
    default: () => new Object()
  }
})
// prop响应式
const emit = defineEmits(['update:visible'])
const visible = useVModel(props, 'visible', emit)
</script>
<style lang="scss" scoped>
.dialog-award {
  text-align: center;
  .content {
    @include toc-images-background;

    background-image: url('#{$image-path}blue-dialog-award-bg.png');
    background-size: 100% 100%;
    width: 316px;
    height: 322px;
    display: block;
    .img {
      box-sizing: border-box;
      padding-top: 200px;
      @include flex-center;

      padding-bottom: 20px;
      img {
        height: 68px;
        width: auto;
      }
    }
    .txt {
      margin: 0 auto;
      width: 184px;
      height: 14px;
      font-size: 14px;

      font-weight: 500;
      color: #fff;
      line-height: 14px;
      overflow: auto;
      word-wrap: normal;
      word-break: keep-all;
    }
  }
  .line {
    margin: 0 auto;
    width: 3px;
    height: 24px;
    background: #ffc10a;
  }
  .btn {
    margin: 0 auto;
    width: 180px;
    height: 36px;
    background: #ffc10a;
    box-shadow: 0 2px 4px 0 rgb(255 193 10 / 15%);
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    line-height: 36px;
  }
  .btn-close {
    margin-top: 30px;
    width: 40px;
    height: 40px;
  }
}
</style>
