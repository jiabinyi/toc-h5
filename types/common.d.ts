/* 类型命名建议以Ty结尾*/
/*
 *
 *枚举 类，接口 都是大驼峰 XingXian
 *方法，变量，常量 小驼峰 xingXian
 *
 */
/* 通用对象*/
declare module '@*'
declare module 'components*'

interface Window {
  $cancelRequest: any
}
interface Date {
  // 给Date添加方法
  Format(params: any): void
}
interface ObjTy {
  [propName: string]: any
}

/* ant select组件 options 参数类型 */
type IOptions<T = number> = Array<{
  label: string
  value: T
}>

interface ResArrData {
  data: Array<{ [propName: string]: any }>
  result: ObjTy
}
interface ResObjData {
  data: ObjTy
  result: ObjTy
}
