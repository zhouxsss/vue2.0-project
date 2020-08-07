import Vue from 'vue'
import VueRouter from 'vue-router'
import { rootMenus } from './utils/menus'
import './utils/myDirective'

import Container from './components/layout/Container'
// import App from './App'
import store from './store'
import routes from './utils/routes'

Vue.use(VueRouter)
const router = new VueRouter(routes)
Vue.config.productionTip = false

//注册全局组件
Vue.component('Container', Container)

const app = new Vue({
  el: '#app',
  store,
  router,
  data: {
    currentRoute: window.location.pathname,
    rootMenus
  },
  computed: {
    ViewComponent() {
      const matchingView = rootMenus[this.currentRoute]
      return matchingView
        ? require(`./pages/${matchingView}.vue`).default
        : require('./pages/404.vue').default
    }
  },
  render(h) {
    //动态渲染组件
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
