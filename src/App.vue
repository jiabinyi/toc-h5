<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="App">
import { sessions } from 'mosowejs'
import http from '@/axios/axios'
import api from '@/axios/apiNames'
import useTheme from '@/utils/hooks/useTheme'
import useGetQuery from '@/utils/hooks/useGetQuery'
const { getUrlParam } = useGetQuery()
const { setBodyClassName } = useTheme()
setBodyClassName(getUrlParam('theme') ?? 'blue')

/**
 * 设置sessionStorage
 * @param key 键
 * @param value 值
 */
const setSession = (key: string, value: string) => {
  sessions.set(key, value)
}
const keys: string[] = [
  'client_id',
  'js_code',
  'tenant',
  'username',
  'password',
  'uuid'
]
keys.forEach((key: string) => {
  setSession(key, getUrlParam(key) ?? '')
})
onMounted(() => {
  const token: string = sessions.get('token') ?? ''
  !token && getActivityTaskList()
})
const getActivityTaskList = async () => {
  const jsCode: string = getUrlParam('js_code') ?? ''
  const clientId: string = getUrlParam('client_id') ?? ''
  const grantType: string = getUrlParam('grant_type') ?? ''
  const params = {
    url: api.getToken,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: grantType,
      client_id: clientId,
      js_code: jsCode
    }
  }
  const res = await http.post(params)
  sessions.set(
    'token',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbmlkIjoib2l2Snd3QlAzU2tldVh0bUp2ZFhnTlJPQnBsdyIsInVzZXJfaWQiOjEzNCwidXNlcl9uYW1lIjoid3gwMWIwZGE5MDVhYTMzZGRjOm9lU2ptNWJuV1BoOXk5WEpnVzkzZXVjVkNaQWc6b2l2Snd3QlAzU2tldVh0bUp2ZFhnTlJPQnBsd0B0MDE6MTM0Iiwib3BlbmlkIjoib2VTam01Ym5XUGg5eTlYSmdXOTNldWNWQ1pBZyIsInNjb3BlIjpbImFsbCJdLCJzZXNzaW9uX2tleSI6IkhmYUY4SGtHNWlsOGJCUXVEUFA4MkE9PSIsImV4cCI6MTY2MDIwNjYyMiwiYXV0aG9yaXRpZXMiOlsibm9ybWFsIl0sImp0aSI6IjdiZDAzMmU4LWVjNTktNDk1Yy04MmM5LTU2M2E0MTBjMGYxMiIsInRlbmFudCI6InQwMSIsImNsaWVudF9pZCI6IlRPQy1URkUtV1hNUEB3eDAxYjBkYTkwNWFhMzNkZGMifQ.fdxy5EYVB7XJLyiQzFuO3rCyJqfqARmkJe_rHmpR77g9cYDGLeErkcPdlcWD7lAQchbvPgddbLbO5UWrwS2Ho68IRpDJlBI-E2YJek-__0YFSu-nSoMaJfSWrDmGzHg7vhpsgb7_CUkgF1G6KY4FQJUD78cLmtmjS6nw_1PA8HMh3Atutholv-r_u7dlsC4B06bOkui2j8L5t7RrF6Bk-NczwAhoNXHNlY_CRznNZaGsfP-R4Wqk4-PCaNUhXy2W4f701g7VAIXOJHBmWFYaksj7lqw-UF8VEv6RDe4uutGiT1Ho4zATDQf6jTp9Il0fIyC2YPj5kSogPCRqtRknAw'
  )
  console.log('res: ', res)
}
</script>
