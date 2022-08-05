import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'amfe-flexible'
import NutUI from '@nutui/nutui'
import { Marquee } from '@nutui/nutui-bingo'
import '@nutui/nutui/dist/style.css'
import '@nutui/nutui-bingo/dist/style.css'
import '@common/assets/styles/index.scss'
const app = createApp(App)

dayjs.locale('zh-ch')
app.config.globalProperties.$dayjs = dayjs

app.use(router)
app.use(NutUI)
app.use(Marquee)

app.mount('#app')
