import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from 'vue-i18n'
import enUS from "../locale/enUS.js";
import zhCN from "../locale/zhCN.js";
import queryString from 'query-string';
import VueHighlightJS from 'vue-highlightjs'


// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// Vue.use(Antd);

import {Button, Pagination, Layout, Icon, Drawer, Radio, Input, Menu, Form, Select, ConfigProvider, Dropdown, DatePicker, Popover, Modal, Message, Notification} from "ant-design-vue"
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Select)
Vue.use(ConfigProvider)
Vue.use(Dropdown)
Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(Modal)
Vue.use(Message)
Vue.use(Notification)



Vue.use(VueI18n);
Vue.use(VueHighlightJS);

import Authorized from './components/Authorized';
Vue.component(Authorized.name, Authorized)

import Auth from './directives/auth';
Vue.use(Auth)

Vue.config.productionTip = false;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notification = Notification;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3758397_jlhl0pms90o.js',
});
Vue.component("IconFont",IconFont);

import vcolorpicker from 'vcolorpicker';
Vue.use(vcolorpicker);


const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: {message: zhCN},
    enUS: {message: enUS},
  }
})

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
