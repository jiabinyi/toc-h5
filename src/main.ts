import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'amfe-flexible'
import NutUI from '@nutui/nutui'
import { Marquee } from '@nutui/nutui-bingo'
import '@nutui/nutui/dist/style.css'
import '@nutui/nutui-bingo/dist/style.css'
import '@common/assets/styles/index.scss'
import VConsole from 'vconsole'

if (['test', 'dev', 'development'].includes(import.meta.env.MODE || '')) {
  new VConsole()
}
console.log(import.meta.env)
const app = createApp(App)

dayjs.locale('zh-ch')
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$pxFlexible = (px: number) => {
  // 倍率
  const radio = document.body.offsetWidth / 375
  return px * radio
}

app.use(router)
app.use(store)
app.use(NutUI)
app.use(Marquee)

app.mount('#app')
