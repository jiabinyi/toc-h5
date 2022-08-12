/**
 * @returns query Object 返回地址栏的参数
 */
const useGetQuery = () => {
  // 获取浏览器url跟参
  const hashStr: string = location.href.split('?')[1] ?? ''
  const regex = (name: string) => `(^|&)${name}=([^&]*)(&|$)`
  const getQuery = (name: string) => hashStr.match(new RegExp(regex(name)))
  const getUrlParam = (name: string) => getQuery(name)?.[2] || null
  return { getUrlParam }
}
export default useGetQuery
