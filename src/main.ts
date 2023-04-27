import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app = createApp(App)


import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();

store.use(piniaPluginPersistedstate);

app.use(store)

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(router)

app.mount('#app')
