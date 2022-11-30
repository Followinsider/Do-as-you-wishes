<template>
	<div class="app-container">
		<div class="app-content">
			<div class="projects-section">
				<div class="projects-section-header">
					<p>Love</p>
					<p class="time">{{new Date(Date.now()).toLocaleString()}}</p>
				</div>

				<div class="projects-section-line">
					<div class="projects-status">
						<div class="item-status">
							<span class="status-number">{{this.selectedList.length}}</span>
							<span class="status-type">Stars</span>
						</div>
						<div class="item-status" v-show="loveLabels.length">
							<span class="status-number">
								<a-dropdown>
									<span ref="loveLabel">{{loveLabel}}<a-icon type="down" id="chooseIcon"/></span>
									<a-menu slot="overlay" @click="chooseStarType">
										<a-menu-item :key="item" v-for="item in loveLabels">
											{{item}}
										</a-menu-item>
										<a-menu-item key="全部">
											全部
										</a-menu-item>
									</a-menu>
								</a-dropdown>
							</span>
							<span class="status-type">loveLabels</span>
						</div>
					</div>

					<!-- 选择列表还是网格布局 -->
					<div class="view-actions">
						<button class="view-btn" @click="removeAll">
							<svg t="1669647367351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4297" width="200" height="200"><path d="M512 954.88c-243.712 0-442.88-199.168-442.88-442.88s199.168-442.88 442.88-442.88 442.88 199.168 442.88 442.88-199.168 442.88-442.88 442.88z m0-63.488c208.896 0 379.392-170.496 379.392-379.392s-170.496-379.392-379.392-379.392-379.392 170.496-379.392 379.392 170.496 379.392 379.392 379.392z m221.184-379.392c0 18.944-12.8 31.744-31.744 31.744h-379.392c-18.944 0-31.744-12.8-31.744-31.744s12.8-31.744 31.744-31.744h379.392c19.456 0 31.744 12.8 31.744 31.744z" p-id="4298"></path></svg>
						</button>
						<button :class="['view-btn', 'list-view', isListActive? 'active': '']" title="List View" @click="changeToListView">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-list"
							>
								<line x1="8" y1="6" x2="21" y2="6" />
								<line x1="8" y1="12" x2="21" y2="12" />
								<line x1="8" y1="18" x2="21" y2="18" />
								<line x1="3" y1="6" x2="3.01" y2="6" />
								<line x1="3" y1="12" x2="3.01" y2="12" />
								<line x1="3" y1="18" x2="3.01" y2="18" />
							</svg>
						</button>
						<button :class="['view-btn', 'grid-view' , isGridActive? 'active': '']" title="Grid View" @click="changeToGridView">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-grid"
							>
								<rect x="3" y="3" width="7" height="7" />
								<rect x="14" y="3" width="7" height="7" />
								<rect x="14" y="14" width="7" height="7" />
								<rect x="3" y="14" width="7" height="7" />
							</svg>
						</button>
					</div>

				</div>
				
				<div :class="['project-boxes',isGridView? 'jsGridView': 'jsListView']">
					<div class="project-box-wrapper" v-for="item in selectedList" :key="item.id">
						<div class="project-box" :style="{'background-color': '#'+item.color}">

							<div class="project-box-header">
								<span style="font-weight:bold">{{new Date(Number(item.releaseTime)).toLocaleString()}}</span>
								<!-- 更多选项 -->
								<div class="more-wrapper">
									<!-- antd 存在多个Popover气泡该如何控制 => 借助另外一个变量（当前气泡的唯一标识, 可以是id, 也可以是key) .这里visiable手动控制也可以解决-->
									<a-popover visable="visiable" trigger="click" @visibleChange="removeWhich(item.id)">
										<a slot="content" @click="moveStar">移除</a>
										<button class="project-btn-more" >
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="feather feather-more-vertical"
												>
												<circle cx="12" cy="12" r="1" />
												<circle cx="12" cy="5" r="1" />
												<circle cx="12" cy="19" r="1" />
											</svg>
										</button>
									</a-popover>
								</div>
							</div>

							<div class="project-box-content-header">
								<p class="box-content-header">{{item.title}}</p>
								<!-- <p class="box-content-subheader">Prototyping</p> -->
							</div>
							<div class="box-progress-wrapper">
								<p class="box-progress-header">Progress</p>
								<div class="box-progress-bar">
									<span
										class="box-progress"
										:style="{width: item.probability + '%', 'background-color': progressColor('#' + item.color)}"
									></span>
								</div>
								<p class="box-progress-percentage">{{item.probability}}%</p>
							</div>
							<div class="project-box-footer">
								<div class="participants">{{item.author}}</div>
								<div class="days-left" style="color: #ff942e">{{item.label}}</div>
							</div>
						</div>
					</div>
				</div>

				<div v-show="!hasLovers" class="lovers_hint">
					<div>
						<a-icon type="heart" class="lovers_icon"/>
						<p class="lovers_font">选一些感兴趣的题目吧</p>
					</div>
				</div>
			</div>

			<div class="messages-section">
				<button class="messages-close">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-x-circle"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="15" y1="9" x2="9" y2="15" />
						<line x1="9" y1="9" x2="15" y2="15" />
					</svg>
				</button>

				<!-- 题目列表 -->
				<div class="projects-section-header">
					<p>题目列表</p>
					<p>
						<a-dropdown>
							<span ref="label" class="chooseLabel">{{chooseLabel}}<a-icon type="down" id="chooseIcon"/></span>
							<a-menu slot="overlay" @click="chooseListType">
								<a-menu-item :key="item" v-for="item in chooseLabels">
									{{item}}
								</a-menu-item>
								<a-menu-item key="全部">
									全部
								</a-menu-item>
							</a-menu>
						</a-dropdown>
					</p>
					<p @click="random_changeList" class="redo_box">
						<a-icon type="redo" v-if="!isLoading" class="redo_icon"/>
						<a-icon type="loading" v-else/>
					</p>
				</div>

				<div class="messages">
					<div class="message-box" v-for="item in list" :key="item.id">
						<div class="message-content">
							<div class="message-header">
								<div class="name">{{item.author || '填充...'}}</div>
								<div class="star-checkbox">
									<a-input type="checkbox" :id="item.id" @click="starList($event,item.id)" />
									<label :for="item.id" >
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="feather feather-star"
										>
											<polygon
												points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
											/>
										</svg>
									</label>
								</div>
							</div>
							<p class="message-line">
								{{item.title || '填充...'}}
							</p>
							<p class="message-line time">{{item.label || '填充...'}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import {LightenDarkenColor} from '@/utils/Project-Management/color.js';
// import {divide_by_someTag} from '@/utils/Project-Management/divide-by-someTag.js';\
export default {
	name: "project-management",
	data() {
		return {
			num: 0,
			list: [],
			selectedMap: {},
			selectedList: [],

			isGridActive: true,
			isListActive: false,
			isGridView: true,

			
    		visiable: false,
			tempId: 0,

			isLoading: false,

			loveLabels: [],
			loveLabel: '全部',

			chooseLabel: '全部',
			chooseLabels: [],

			rangeNum: 0
		}
	},
	computed: {
		// 返回数据向下取整,求可分割区间长度
		split_len() {
			return Math.ceil(this.projectResult.length / 10)
		},
		...mapState('project',['projectResult']),
		hasLovers() {
			return this.selectedList.length < 1 ? false: true;
		},
	},
	methods: {
		changeToListView() {
			this.isListActive = true;
			this.isGridActive = false;
			this.isGridView = false;
		},
		changeToGridView() {
			this.isGridView = true;
			this.isListActive = false;
			this.isGridActive = true;
		},
		// 获取题目列表数据，总共很多条
		async getProjectList() {
			this.isLoading = true;

			await this.$store.dispatch('project/getProjectList', {id: this.num});
			this.random_changeList();

			this.isLoading = false;
		},
		// 简单拆分出 n 条
		random_changeList() {
			
			this.isLoading = true;

			// 随机获取指定区间的列表内容
			this.rangeNum = this.getRandomInt(0, this.split_len);
			let tempList = JSON.parse( JSON.stringify( this.projectResult ) );
			
			// 拼接原先的列表内容
			this.list = this.list.concat( tempList.splice(this.rangeNum, 10) );

			const map = new Map();
			for (let item of this.list){
				if( !map.has( item.id ) ){
					map.set( item.id, item)
				}
			}

			this.list = [...map.values()];

			const chooseMap = new Map();
			for (let item of this.list) {
				if ( !chooseMap.has(item.label) ) {
					chooseMap.set(item.label, 1)
				}else {
					chooseMap.set(item.label, chooseMap.get(item.label) + 1);
				}
			}

			this.chooseLabels = Array.from(chooseMap.keys());

			console.log(this.chooseLabels);

			localStorage.setItem('list',JSON.stringify(this.list) );

			this.isLoading = false;
		},
		//不含最大值，含最小值 => 得到一个两数之间的随机整数
		getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min; 
		},
		starList(e, i) {
			this.selectedMap[i] = e.target.checked;
			if (this.chooseLabel !== '全部') {
				// 这里将会丢失之前主动添加的color && probability字段
				this.selectedList = JSON.parse(localStorage.getItem('list')).filter(item => this.selectedMap[item.id] || false);
			}else {
				this.selectedList = this.list.filter(item => this.selectedMap[item.id] || false);
			}
		
			const loveLabelsMap = {};
			// 为返回数据主动添加字段，仅项目演示，实际开发遵守规范
			this.selectedList = this.selectedList.map(e => {
				if (!e.color && !e.probability) {
					e.color = Math.floor( Math.random() * 16777215 ).toString(16);
					e.probability = Math.floor( Math.random() * 101 );
				}
				if (!loveLabelsMap[e.label]) {
					loveLabelsMap[e.label] = 1;
				}else {
					loveLabelsMap[e.label] += 1;
				}
				return e
			});
			
			// 对象还有个数值,有需要可添加
			this.loveLabels = Object.keys(loveLabelsMap);
			
			if (this.loveLabel !== '全部') {
				this.selectedList = this.selectedList.filter(item => item.label === this.loveLabel);
			}
			
		},
		progressColor(color) {
			return LightenDarkenColor( color, 30)
		},
		moveStar() {
			this.selectedList = this.selectedList.filter(item => item.id !== this.tempId);
			document.getElementById(this.tempId).checked = false;

			// 注意这里要重置下，不然在 starList 方法中过滤始终为true
			this.selectedMap[this.tempId] = false;
		},
		removeWhich(id) {
			this.tempId = id;
		},
		chooseStarType({key}) {
			this.loveLabel = key;

			if (key === '全部') {
				this.selectedList = this.list.filter(item => this.selectedMap[item.id] || false);
				return;
			}
			this.selectedList = this.list.filter(item => this.selectedMap[item.id] || false).filter(item => item.label === key);
			
		},
		chooseListType({key}) {
			this.chooseLabel = key;

			const storage_data = JSON.parse( localStorage.getItem('list') );

			// this.chooseLabels = divide_by_someTag('label',storage_data).keys();
			
			if (key === '全部') {
				this.list = storage_data;
				return;
			}
			
			this.list = storage_data.filter(item => item.label === key);
			
		},
		removeAll() {
			this.$confirm({
				title: '确定要删除全部喜好题目吗?',
				content: '请再次确认',
				// 获取removeAll的this也即组件的this
				onOk: ()=> {
					return new Promise((resolve, reject) => {
						setTimeout(this.selectedList.length > 0? resolve: reject, 800);
						
					}).then(()=> {
						for (let item of this.selectedList) {
							this.tempId = item.id;
							this.moveStar();
						}
						this.loveLabels = [];
						console.log(this.loveLabels);
						this.$message.success('删除成功');
					}).catch(() => this.$message.info('暂时没有可删除题目'));
				},
				onCancel() {},
			});
			
		}
	},
	mounted() {
		this.getProjectList();
	},

};
</script>

<style scoped>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100vh;
  margin: 0;
}

body {
  font-family: "DM Sans", sans-serif;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.redo_box {
	cursor: pointer;
}


button, a {
  cursor: pointer;
}


.lovers_icon {
	font-size: 124px;
}

.lovers_font {
	font-size: 24px;
}
.lovers_hint {
	text-align: center;
	flex: 1 0 auto;
	display: flex;
    align-items: center;
    justify-content: center;
}
.messages {
	height: 65vh;
}


.chooseLabel:hover {
	cursor: pointer;
}
#chooseIcon {
	font-size: 24px;
}


.redo_icon {
	transform: rotate(360deg);
    transition: .5s;
}
.redo_icon:active {
	transform: rotate(0);
    transition: 0s;
}



/* ---- */
.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: 0.2s;
  max-width: 1800px;
}
.app-container button, .app-container input, .app-container optgroup, .app-container select, .app-container textarea {
  font-family: "DM Sans", sans-serif;
}
.app-content {
  display: flex;
  height: 100%;
  overflow: hidden;
  padding: 16px 24px 24px 0;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  position: relative;
}
.app-header-left, .app-header-right {
  display: flex;
  align-items: center;
}
.app-header-left {
  flex-grow: 1;
}
.app-header-right button {
  margin-left: 10px;
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
.app-name {
  margin: 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin: 0 32px;
}

.mode-switch {
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-wrapper {
  border-radius: 20px;
  padding-right: 12px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
  overflow: hidden;
}
.dark .search-wrapper {
  box-shadow: none;
}

.search-input {
  border: none;
  flex: 1;
  outline: none;
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
}
.search-input:placeholder {
  opacity: 0.6;
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

.page-content  {
  flex: 1;
  width: 100%;
}

.app-sidebar {
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app-sidebar-link {
  margin: 16px 0;
  transition: 0.2s;
  border-radius: 50%;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.projects-section {
  flex: 2;
  background-color: #ffffff;
  border-radius: 32px;
  padding: 32px 32px 0 32px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.projects-section-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
}
.projects-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.projects-section-header p {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  opacity: 0.9;
  margin: 0;
}
.projects-section-header .time {
  font-size: 20px;
}

.projects-status {
  display: flex;
}

.item-status {
  display: flex;
  flex-direction: column;
  margin-right: 16px;
}
.item-status:not(:last-child) .status-type:after {
  content: "";
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translatey(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-number {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
}

.status-type {
  position: relative;
  padding-right: 24px;
}

.view-actions {
  display: flex;
  align-items: center;
}

.view-btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: var(--main-color);
  margin-left: 8px;
  transition: 0.2s;
}
.view-btn.active {
  background-color: #1f1c2e;;
  color: #fff
}
.view-btn:not(.active):hover {
  background-color: #c3cff4;
  color: #fff;
}

.messages-section {
  flex-shrink: 0;
  padding-bottom: 32px;
  background-color: #ffffff;
  margin-left: 24px;
  flex: 1;
  width: 100%;
  border-radius: 30px;
  position: relative;
  overflow: auto;
  transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);
}
.messages-section .messages-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  border: none;
  background-color: transparent;
  color: #1f1c2e;
  display: none;
}
.messages-section.show {
  transform: translateX(0);
  opacity: 1;
  margin-left: 0;
}
.messages-section .projects-section-header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 32px 24px 0 24px;
  background-color: #ffffff;
}

.message-box {
  border-top: 1px solid #e9ebf0;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.message-box:hover {
  background-color: #fafcff;
  border-top-color: #c3cff4;
}
.message-box:hover + .message-box {
  border-top-color: #c3cff4;
}
.message-box img {
  border-radius: 50%;
  -o-object-fit: cover;
     object-fit: cover;
  width: 40px;
  height: 40px;
}

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.message-header .name {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: var(--main-color);
  margin: 0;
}

.message-content {
  padding-left: 16px;
  width: 100%;
}

.star-checkbox input {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
.star-checkbox label {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.dark .star-checkbox {
  color: var(--secondary-color);
}
.dark .star-checkbox input:checked + label {
  color: var(--star);
}
.star-checkbox input:checked + label svg {
  fill: var(--star);
  transition: 0.2s;
}

.message-line {
  font-size: 14px;
  line-height: 20px;
  margin: 8px 0;
  color: var(--secondary-color);
  opacity: 0.7;
}
.message-line.time {
  text-align: right;
  margin-bottom: 0;
}

.project-boxes {
  margin: 0 -8px;
  overflow-y: auto;
}
.project-boxes.jsGridView {
  display: flex;
  flex-wrap: wrap;
}
.project-boxes.jsGridView .project-box-wrapper {
  width: 33.3%;
}
.project-boxes.jsListView .project-box {
  display: flex;
  border-radius: 10px;
  position: relative;
}
.project-boxes.jsListView .project-box > * {
  margin-right: 24px;
}
.project-boxes.jsListView .more-wrapper {
  position: absolute;
  right: 16px;
  top: 16px;
}
.project-boxes.jsListView .project-box-content-header {
  order: 1;
  max-width: 120px;
}
.project-boxes.jsListView .project-box-header {
  order: 2;
}
.project-boxes.jsListView .project-box-footer {
  order: 3;
  padding-top: 0;
  flex-direction: column;
  justify-content: flex-start;
}
.project-boxes.jsListView .project-box-footer:after {
  display: none;
}
.project-boxes.jsListView .participants {
  margin-bottom: 8px;
}
.project-boxes.jsListView .project-box-content-header p {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.project-boxes.jsListView .project-box-header > span {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 12px;
}
.project-boxes.jsListView .box-progress-wrapper {
  order: 3;
  flex: 1;
}

.project-box {
  border-radius: 30px;
  padding: 16px;
}
.project-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: var(--main-color);
}
.project-box-header span {
  color: #4A4A4A;
  opacity: 0.7;
  font-size: 14px;
  line-height: 16px;
}
.project-box-content-header {
  text-align: center;
  margin-bottom: 16px;
}
.project-box-content-header p {
  margin: 0;
}
.project-box-wrapper {
  padding: 8px;
  transition: 0.2s;
}

.project-btn-more {
  padding: 0;
  height: 14px;
  width: 24px;
  height: 24px;
  position: relative;
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  /*&:after, &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--main-color);
    opacity: .8;
    left: 50%;
    transform: translatex(-50%);
  }
  &:before { top: 0;}
  &:after { bottom: 0; }*/
}

.more-wrapper {
  position: relative;
}

.box-content-header {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  opacity: 0.7;
}

.box-content-subheader {
  font-size: 14px;
  line-height: 24px;
  opacity: 0.7;
}

.box-progress {
  display: block;
  height: 4px;
  border-radius: 6px;
}
.box-progress-bar {
  width: 100%;
  height: 4px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
  margin: 8px 0;
}
.box-progress-header {
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  margin: 0;
}
.box-progress-percentage {
  text-align: right;
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
}

.project-box-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  position: relative;
}
.project-box-footer:after {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: calc(100% + 32px);
  top: 0;
  left: -16px;
  height: 1px;
}

.participants {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.participants img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  -o-object-fit: cover;
     object-fit: cover;
}
.participants img:not(:first-child) {
  margin-left: -8px;
}

.add-participant {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.6);
  margin-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.days-left {
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  border-radius: 20px;
  flex-shrink: 0;
  padding: 6px 16px;
  font-weight: 700;
}

.mode-switch.active .moon {
  fill: var(--main-color);
}

.messages-btn {
  border-radius: 4px 0 0 4px;
  position: absolute;
  right: 0;
  top: 58px;
  background-color: var(--message-btn);
  border: none;
  color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  display: none;
}

@media screen and (max-width: 980px) {
  .project-boxes.jsGridView .project-box-wrapper {
    width: 50%;
  }

  .status-number, .status-type {
    font-size: 14px;
  }

  .status-type:after {
    width: 4px;
    height: 4px;
  }

  .item-status {
    margin-right: 0;
  }
}
@media screen and (max-width: 880px) {
  .messages-section {
    transform: translateX(100%);
    position: absolute;
    opacity: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
  }
  .messages-section .messages-close {
    display: block;
  }

  .messages-btn {
    display: flex;
  }
}
@media screen and (max-width: 720px) {
  .app-name, .profile-btn span {
    display: none;
  }

  .add-btn, .notification-btn, .mode-switch {
    width: 20px;
    height: 20px;
  }
  .add-btn svg, .notification-btn svg, .mode-switch svg {
    width: 16px;
    height: 16px;
  }

  .app-header-right button {
    margin-left: 4px;
  }
}
@media screen and (max-width: 520px) {
  .projects-section {
    overflow: auto;
  }

  .project-boxes {
    overflow-y: visible;
  }

  .app-sidebar, .app-icon {
    display: none;
  }

  .app-content {
    padding: 16px 12px 24px 12px;
  }

  .status-number, .status-type {
    font-size: 10px;
  }

  .view-btn {
    width: 24px;
    height: 24px;
  }

  .app-header {
    padding: 16px 10px;
  }

  .search-input {
    max-width: 120px;
  }

  .project-boxes.jsGridView .project-box-wrapper {
    width: 100%;
  }

  .projects-section {
    padding: 24px 16px 0 16px;
  }

  .profile-btn img {
    width: 24px;
    height: 24px;
  }

  .app-header {
    padding: 10px;
  }

  .projects-section-header p,
.projects-section-header .time {
    font-size: 18px;
  }

  .status-type {
    padding-right: 4px;
  }
  .status-type:after {
    display: none;
  }

  .search-input {
    font-size: 14px;
  }

  .messages-btn {
    top: 48px;
  }

  .box-content-header {
    font-size: 12px;
    line-height: 16px;
  }

  .box-content-subheader {
    font-size: 12px;
    line-height: 16px;
  }

  .project-boxes.jsListView .project-box-header > span {
    font-size: 10px;
  }

  .box-progress-header {
    font-size: 12px;
  }

  .box-progress-percentage {
    font-size: 10px;
  }

  .days-left {
    font-size: 8px;
    padding: 6px 6px;
    text-align: center;
  }

  .project-boxes.jsListView .project-box > * {
    margin-right: 10px;
  }

  .project-boxes.jsListView .more-wrapper {
    right: 2px;
    top: 10px;
  }
}
</style>