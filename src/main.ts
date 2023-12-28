import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/vfonts-0.0.3/Lato.css'
import '@/assets/vfonts-0.0.3/FiraCode.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import naive from 'naive-ui'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$patch(initialState)
  }
})
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(naive)
app.mount('#app')
