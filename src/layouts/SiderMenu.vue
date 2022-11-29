<template>
    <div style="width: 256px">
        <a-menu
            :openKeys.sync="openKeys"
            :selectedKeys="selectedKeys"
            mode="inline"
            :theme="theme"
        >
            <template v-for="item in menuData">
                <a-menu-item v-if="!item.children" :key="item.path" @click="()=> $router.push({path: item.path, query: $route.query})">
                    <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
                    <span>{{ item.meta.title }}</span>
                </a-menu-item>
                <sub-menu v-else :key="item.path" :menu-info="item" />
            </template>
        </a-menu>
    </div>
</template>

<script>
import SubMenu from './SubMenu.vue';
import {check} from '../utils/auth';
export default {
    props: {
        theme: {
            type: String,
            default: "dark"
        },
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        '$route.path': function(val) {
            this.selectedKeys = this.selectedKeysMap[val];
            this.openkeys = this.collapsed ? [] : this.openKeysMap[val];
        },

        // 通过collapse来判断当前openKeys是否需要剪切
        collapsed(val) {
            // collapsed为True 且 当前openKeys有值则更新openKeys
            if (val && this.openKeys) {
                this.openKeys.splice(0, this.openKeys.length)
            }
        },
        role() {
            this.menuData = this.getMenuData(this.$router.options.routes)
        }
    },
    components: { SubMenu,},
    data() {
        this.selectedKeysMap = {}
        this.openKeysMap = {}
        const menuData = this.getMenuData(this.$router.options.routes)
        // console.log('selectedKeysMap', this.selectedKeysMap)
        // console.log('openKeysMap', this.openKeysMap)
        return {
            openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
            menuData,
            selectedKeys: this.selectedKeysMap[this.$route.path],
        };
    },
    methods: {
        // 菜单和路由结合的核心代码
        getMenuData(routes = [], parentKeys = [], selectedKey) {
            const menuData = [];
            for (let item of routes) {
                // 这个判断对应是 -> 判断权限范围决定是否要渲染路由
                if (item.meta && item.meta.authority && !check(item.meta.authority)) {
                    break;
                }

                // 依照之前约定，有name 和 无hideInMenu则是要渲染的
                if (item.name && !item.hideInMenu) {

                    this.openKeysMap[item.path] = parentKeys;
                    this.selectedKeysMap[item.path] = [item.path || selectedKey];

                    const newItem = {...item};
                    delete newItem.children;

                    if (item.children && !item.hideChildrenInMenu) {
                        newItem.children = this.getMenuData(item.children, [...parentKeys, item.path]);
                    }else {
                        // 这里有一些疑惑，不知道有什么用，同时selectedKey作用在哪？
                        this.getMenuData(item.children, selectedKey? parentKeys:[...parentKeys, item.path], selectedKey || item.path);
                    }
                    menuData.push(newItem);
                    
                }else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
                    menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]))
                };

            }

            return menuData
        }
    },
};
</script>