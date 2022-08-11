import dayjs from 'dayjs'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $dayjs: dayjs.Dayjs
  }
}
declare module 'qs' {
  export interface ParsedQs {
    [key: string]: any
  }
}
