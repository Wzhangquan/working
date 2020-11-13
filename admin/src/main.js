import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Router from "vue-router"

Vue.config.productionTip = false
Vue.use(ElementUI)
import "@/assets/css/reset.css"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/css/styleReset.css"
import "nprogress/nprogress.css"

//路由重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')