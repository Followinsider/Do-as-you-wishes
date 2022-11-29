<template>
  <div :class="[`nav-theme=${navTheme}`,`nav-layout-${navLayout}`]">
    <a-layout style="min-height: 100vh">
        <a-layout-sider 
            v-model="collapsed" 
            :trigger=null 
            :theme="navTheme"
            
            v-if="navLayout==='left'"
            width="256px"
        >
            <div :class="[navTheme==='dark'? 'logo_white':'logo_dark','logo']">Ant Design Vue Pro</div>
            <SiderMenu :theme="navTheme" :collapsed="collapsed"/>
        </a-layout-sider>

        <a-layout>
            <a-layout-header class="header">
                <div class="header_left">
                    <a-icon 
                        class="icon_draw" 
                        :type="collapsed? 'menu-unfold':'menu-fold'" 
                        @click="collapsed = !collapsed"
                        v-auth="['admin']"
                    >
                    </a-icon>
                </div>
                <div class="header_right">
                    <div id="colorPicker">
                        <colorPicker  v-model="color" @change="headleChangeColor"/>
                    </div>
                    <Header />
                </div>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                <Footer />
            </a-layout-footer>
        </a-layout>

    </a-layout>
    <Authorized :authority="['admin']">
        <SettingDrawer :color="color"/>
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";
import SettingDrawer from '../components/SettingDrawer'

export default {
  name: "BasicLayout",
  components: { Header, Footer, SiderMenu, SettingDrawer, },
  data() {
    return {
        collapsed: false,
        color: window.less.options.modifyVars['primary-color']
    }
  },
  methods: {
    headleChangeColor() {
        window.less.modifyVars({"@primary-color": this.color});
        window.document.querySelector('.setting-drawer-handle').classList.add('colorPicker');
    }
  },
  computed: {
    navTheme() {
        return this.$route.query.navTheme || "dark"
    },
    navLayout() {
        return this.$route.query.navLayout || "left"
    }
  },
};
</script>

<style scoped>
.header {
    background-color: #FFF;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
}
.icon_draw {
    font-size: 26px;
    line-height: 64px;
}
.logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
}
.logo_white {
    color: #FFF;
}
.logo_dark {
    color: black;
}
.header_right {
    display: flex;
}
#colorPicker:hover {
    /* padding-right: 60px; */
    cursor: pointer;
}
#colorPicker >>> .open {
    z-index: 100;
}
</style>