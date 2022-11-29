<template>
    <div>
        <a-drawer
            :visible="visible"
            class="custom-class"
            placement="right"
            @close="onClose"
        >
        <template v-slot:handle>
            <div class="setting-drawer-handle colorPicker" @click="visible = !visible" :style="compStyle">
                <a-icon :type="visible? 'close':'setting'"></a-icon>
            </div>
        </template>
        <div>
            <a-radio-group 
                @change="(e)=> handleSetting('navTheme',e.target.value)"
                :value="$route.query.navTheme || 'dark'"
                
            >
                <h2>整体风格设置</h2>
                <a-radio value="light">白色</a-radio>
                <a-radio value="dark">黑色</a-radio>
            </a-radio-group>
            <a-radio-group 
                @change="(e)=> handleSetting('navLayout',e.target.value)"
                :value="$route.query.navLayout || 'left'" 
            >
                <h2>导航模式</h2>
                <a-radio value="left">左侧</a-radio>
                <a-radio value="top">顶部</a-radio>
            </a-radio-group>
        </div>

        <p>Something you want to do, you need to do, you could done it</p>
        
        </a-drawer>
    </div>
</template>

<script>
export default {
    name: 'SettingDrawer',
    props: {
        color: {
            type: String,
            default: window.less.options.modifyVars['primary-color']
        },
    },
    data() {
        return {
            visible: false,
            value: 1,
            navTheme: "dark",
            navLayout: "left",
        }
    },
    methods: {
        showDrawer() {
            this.visible = true
        },
        onClose() {
            this.visible = false
        },
        handleSetting(type, value) {
            this.$router.push({query: {...this.$route.query, [type]: value}})
        }
    },
    computed: {
        compStyle() {
            return {
                '--color': this.color
            }
        }
    }
}
</script>

<style scoped>
.setting-drawer-handle {
    position: absolute;
    height: 48px;
    background: var(--color);
    top: 240px;
    right: 256px;
    font-size: 26px;
    width: 40px;
    text-align: center;
    line-height: 48px;
    color: #fff;
}
</style>