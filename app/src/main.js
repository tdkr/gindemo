import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

import './icons'
import Element from 'element-ui'
import './styles/element-variables.scss'
import './styles/index.scss' // global css
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

Vue.use(Element, {
  // size: Cookies.get('size') || 'medium',
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
