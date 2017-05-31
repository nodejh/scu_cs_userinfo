// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { AjaxPlugin } from 'vux'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import Login from './components/Login'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)

console.log('http: ', Vue.http)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/login',
  component: Login
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
