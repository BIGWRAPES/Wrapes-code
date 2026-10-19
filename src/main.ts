import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { transparentLogo } from './utils/logo'

createApp(App).mount('#app')

transparentLogo.then((src) => {
  const favicon = document.querySelector<HTMLLinkElement>('#site-favicon')
  if (favicon) favicon.href = src
})
