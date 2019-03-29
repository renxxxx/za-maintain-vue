import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import App from "./App.vue";
import Vuex from "vuex";
Vue.use(Vuex);
import PageLogin from "./components/page/login/login.vue";
import PageIndex from "./components/page/index/index.vue";
import articleManageIndex from "./components/articleManage/index.vue";
import articleManageInfo from "./components/articleManage/info.vue";
import articleManageAdd from "./components/articleManage/add.vue";
import articleTypeManageIndex from "./components/articleTypeManage/index.vue";
import articleTypeManageInfo from "./components/articleTypeManage/info.vue";
import productTypeManageIndex from "./components/productTypeManage/index.vue";
import productTypeManageInfo from "./components/productTypeManage/info.vue";
import productTypeManageAdd from "./components/productTypeManage/add.vue";
import productManageIndex from "./components/productManage/index.vue";
import productManageInfo from "./components/productManage/info.vue";
import productManageAdd from "./components/productManage/add.vue";
import adPlaceManageIndex from "./components/adPlaceManage/index.vue";
import adPlaceManageInfo from "./components/adPlaceManage/info.vue";
import adManageIndex from "./components/adManage/index.vue";
import adManageInfo from "./components/adManage/info.vue";
import adManageAdd from "./components/adManage/add.vue";
import maintainModuleManageIndex from "./components/maintainModuleManage/index.vue";
import maintainModuleManageInfo from "./components/maintainModuleManage/info.vue";
import maintainUserManageIndex from "./components/maintainUserManage/index.vue";
import maintainUserManageInfo from "./components/maintainUserManage/info.vue";
import maintainUserManageAdd from "./components/maintainUserManage/add.vue";
import clientUserManageIndex from "./components/clientUserManage/index.vue";
import clientUserManageInfo from "./components/clientUserManage/info.vue";
import clientUserManageAdd from "./components/clientUserManage/add.vue";
import clientVisitorMsgManageIndex from "./components/clientVisitorMsgManage/index.vue";
import clientVisitorMsgManageInfo from "./components/clientVisitorMsgManage/info.vue";
import clientLogManageIndex from "./components/clientLogManage/index.vue";
import clientLogManageInfo from "./components/clientLogManage/info.vue";
import maintainLogManageIndex from "./components/maintainLogManage/index.vue";
import maintainLogManageInfo from "./components/maintainLogManage/info.vue";
import sysparamManageIndex from "./components/sysparamManage/index.vue";
import sysparamManageInfo from "./components/sysparamManage/info.vue";
import pageManageRegisterProtocol from "./components/pageManage/registerProtocol.vue";
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

import ElementUI from "element-ui";
Vue.use(ElementUI);
import "element-ui/lib/theme-chalk/index.css";
import thoseUtil from "./components/thoseUtil.js";
import thisUtil from "./components/thisUtil.js";
import theseUtil from "./components/theseUtil.js";
import jsonDB from "./components/jsonDB.js";
import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import jQuery from "jquery";

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;
Vue.prototype.projectTitle = "忠安官网运维平台";
Vue.prototype.thoseUtil = thoseUtil;
Vue.prototype.thisUtil = thisUtil;
Vue.prototype.theseUtil = theseUtil;
Vue.prototype.jsonDB = jsonDB;
Vue.prototype.axios = axios;
Vue.prototype.axios.qs = qs;
Vue.prototype.Cookies = Cookies;
Vue.prototype.jQuery = jQuery;
let state = {
  token: null,
  articleTypes: null,
  userBaseInfo: null
};
let mutations = {};
for (let key of Object.keys(state)) {
  mutations[key] = (state, payload) => {
    state[key] = payload;
  };
}

var store = new Vuex.Store({
  state,
  mutations
});

const routes = [
  { path: "/", redirect: "/index" },
  { path: "/index.html", redirect: "/index" },
  { path: "/login", component: PageLogin },
  { path: "/register", component: PageLogin },
  {
    path: "/index",
    component: PageIndex,
    children: [
      {
        path: "/articleManage/index",
        component: articleManageIndex
      },
      {
        path: "/articleManage/info/:itemId",
        component: articleManageInfo
      },
      {
        path: "/articleManage/add",
        component: articleManageAdd
      },
      {
        path: "/articleTypeManage/index",
        component: articleTypeManageIndex
      },
      {
        path: "/articleTypeManage/info/:itemId",
        component: articleTypeManageInfo
      },
      {
        path: "/productTypeManage/index",
        component: productTypeManageIndex
      },
      {
        path: "/productTypeManage/info/:itemId",
        component: productTypeManageInfo
      },
      {
        path: "/productTypeManage/add",
        component: productTypeManageAdd
      },
      {
        path: "/productManage/index",
        component: productManageIndex
      },
      {
        path: "/productManage/info/:itemId",
        component: productManageInfo
      },
      {
        path: "/productManage/add",
        component: productManageAdd
      },
      {
        path: "/adPlaceManage/index",
        component: adPlaceManageIndex
      },
      {
        path: "/adPlaceManage/info/:itemCode",
        component: adPlaceManageInfo
      }, {
        path: "/adManage/index",
        component: adManageIndex
      },
      {
        path: "/adManage/info/:itemId",
        component:adManageInfo
      },
      {
        path: "/adManage/add",
        component: adManageAdd
      }, {
        path: "/maintainModuleManage/index",
        component: maintainModuleManageIndex
      },
      {
        path: "/maintainModuleManage/info/:itemId",
        component:maintainModuleManageInfo
      }, {
        path: "/maintainUserManage/index",
        component: maintainUserManageIndex
      },
      {
        path: "/maintainUserManage/info/:itemId",
        component:maintainUserManageInfo
      }, {
        path: "/maintainUserManage/add",
        component: maintainUserManageAdd
      }, {
        path: "/clientUserManage/index",
        component: clientUserManageIndex
      },
      {
        path: "/clientUserManage/info/:itemId",
        component:clientUserManageInfo
      }, {
        path: "/clientUserManage/add",
        component: clientUserManageAdd
      }, {
        path: "/clientVisitorMsgManage/index",
        component: clientVisitorMsgManageIndex
      },
      {
        path: "/clientVisitorMsgManage/info/:itemId",
        component:clientVisitorMsgManageInfo
      }
      , {
        path: "/clientLogManage/index",
        component: clientLogManageIndex
      },
      {
        path: "/clientLogManage/info/:itemId",
        component:clientLogManageInfo
      }
      , {
        path: "/maintainLogManage/index",
        component: maintainLogManageIndex
      },
      {
        path: "/maintainLogManage/info/:itemId",
        component:maintainLogManageInfo
      }, {
        path: "/sysparamManage/index",
        component: sysparamManageIndex
      },
      {
        path: "/sysparamManage/info/:itemCode",
        component:sysparamManageInfo
      },
      {
        path: "/pageManage/registerProtocol",
        component:pageManageRegisterProtocol
      },

    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/zhongan/maintain",
  routes // (缩写) 相当于 routes: routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
