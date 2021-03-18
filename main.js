import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  './assets/libs/css/style.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
