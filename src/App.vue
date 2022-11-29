<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <user-layout></user-layout>
    </a-config-provider>
  </div>
</template>
<script>
import UserLayout from './layouts/UserLayout.vue';
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN.js";
import enUS from "ant-design-vue/lib/locale-provider/en_US.js";
import moment from 'moment';
import "moment/locale/zh-cn";
export default {
  components: { UserLayout },
  name: 'App',
  data() {
    return {
      locale: zhCN
    }
  },
  watch: {
    '$route.query.locale': function(val) {
      this.locale = val === 'enUS'? enUS : zhCN;
      moment.locale(val === 'enUS' ? 'en': 'zh-CN')
    }
  },

}
</script>
<style lang="less">
</style>
