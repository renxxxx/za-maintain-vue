import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import App from './App.vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import PageLogin from './components/page/login/login.vue'
import PageIndex from './components/page/index/index.vue'
import articleManageIndex from './components/articleManage/index.vue'
import articleManageInfo from './components/articleManage/info.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import thoseUtil from './components/thoseUtil.js';
import thisUtil from './components/thisUtil.js';
import theseUtil from './components/theseUtil.js';
import jsonDB from './components/jsonDB.js';
import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import jQuery from 'jquery'
Vue.use(ElementUI);

console.log(jsonDB)

Vue.config.productionTip = false
Vue.prototype.thoseUtil = thoseUtil;
Vue.prototype.thisUtil = thisUtil;
Vue.prototype.theseUtil = theseUtil;
Vue.prototype.jsonDB = jsonDB;
Vue.prototype.axios = axios;
Vue.prototype.axios.qs = qs;
Vue.prototype.Cookies = Cookies;
Vue.prototype.jQuery = jQuery;

let stateKeys = ['token']

let mutations = {}
for (let key of stateKeys) {
  mutations[key] = (state, payload) => { state[key] = payload }
}

var store = new Vuex.Store({
  state: {
    token: null,
    articleTypes: null
  },
  mutations: {
    token(state, payload) {
      state.token = payload
    }
  },
})


const routes = [
  { path: '/', redirect: '/index' },
  { path: '/login', component: PageLogin },
  { path: '/register', component: PageLogin },
  {
    path: '/index', component: PageIndex,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/articleManageIndex',
        component: articleManageIndex
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: '/articleManageInfo',
        component: articleManageInfo
      }
    ]
  }

]


const router = new VueRouter({
  mode: 'history',
  base: '/zhongan/maintain',
  routes // (缩写) 相当于 routes: routes
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



