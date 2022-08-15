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
export interface UseVModelOptions<T> {
  passive?: boolean
  eventName?: string
  deep?: boolean
  defaultValue?: T
}
export declare function useVModel<
  P extends object,
  K extends keyof P,
  Name extends string
>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options?: UseVModelOptions<P[K]>
): Ref<UnwrapRef<P[K]>> | WritableComputedRef<P[K]>
