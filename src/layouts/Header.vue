<template>
	<div class="header_tools">
		<div class="app-header-right">
			<a-dropdown class="header_dropdown_global">
				<a-icon type="global" class="header_icon"/>
				<a-menu slot="overlay" @click="localeChange" :selectedKeys="[$route.query.locale || 'zhCN']">
					<a-menu-item key="zhCN">
						中文
					</a-menu-item>
					<a-menu-item key="enUS">
						English
					</a-menu-item>
				</a-menu>
			</a-dropdown>
			<button class="notification-btn" @click="notification_yourself">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					class="feather feather-bell">
					<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
					<path d="M13.73 21a2 2 0 0 1-3.46 0" />
				</svg>
			</button>
			<button class="profile-btn profile-btn-class">
				<img src="@/assets/avatar.jpg" />
				<span>Followinsider</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        localeChange({key}) {
            this.$router.push({query: {...this.$route.query, locale: key}});
            this.$i18n.locale = key;
        },
		notification_yourself() {
			this.$notification.open({
				message: '今天要做的事情',
				description: '1.吃饭(Eat), 2.学习(Study), 3.睡觉(Sleep)',
				duration: 10,
			});
		}
    }
}
</script>

<style scoped>
.header_dropdown_global:hover {
	cursor: pointer;
}
.profile-btn-class {
    margin-left: 14px;
}

.header_tools {
    float: right;
    margin-right: 30px;
    margin-left: 14px;
}
.header_icon {
    font-size: 20px;
    line-height: 64px;
    margin-right: 14px;
}

.app-header-left, .app-header-right {
  display: flex;
  align-items: center;
}
.app-header-left {
  flex-grow: 1;
}

.app-icon {
  width: 26px;
  height: 2px;
  border-radius: 4px;
  position: relative;
}
.app-icon:before, .app-icon:after {
  content: "";
  position: absolute;
  width: 12px;
  height: 2px;
  border-radius: 4px;
  left: 50%;
  transform: translatex(-50%);
}
.app-icon:before {
  top: -6px;
}
.app-icon:after {
  bottom: -6px;
}
.mode-switch {
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}


.add-btn {
  color: #fff;
  padding: 0;
  border: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notification-btn {
	padding: 0;
	border: 0;
	background-color: transparent;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.notification-btn:hover {
	cursor: pointer;
}

.profile-btn {
  padding: 0;
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 12px;
  border-left: 2px solid #ddd;
}
.profile-btn img {
  width: 32px;
  height: 32px;
  -o-object-fit: cover;
     object-fit: cover;
  border-radius: 50%;
  margin-right: 4px;
}
.profile-btn span {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}


</style>