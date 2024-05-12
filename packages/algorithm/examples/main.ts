import {createApp} from 'vue'

import App from './app'
import router from './router'
import "@/assets/less/index.less"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
const app = createApp(App)


app.use(router)
app.use(Antd)

app.mount('#app')