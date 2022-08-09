import dayjs from 'dayjs'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $dayjs: dayjs.Dayjs
  }
}
