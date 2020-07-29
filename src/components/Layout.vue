<template>
	<div>
		<el-container>
			<!-- 头部 -->
			<el-header style="padding: 0px;height: auto;">
				<NavBar @change="handlechange"></NavBar>
			</el-header>
			<el-container>
				<!-- 左菜单 -->
				<el-aside width="200px">
					<LeftMenu :isCollapse="isCollapse"></LeftMenu>
				</el-aside>
				<!-- 右主题 -->
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';

	export default {
		name: '',
		components: {
			NavBar,
			LeftMenu
		},
		data(){
			return{
				isCollapse:false
			}
		},
		methods:{
			handlechange(){
				if(this.isCollapse== true){
					this.isCollapse= false;
				}else{
					this.isCollapse= true;
				}
			}
		}
	}
</script>

<style>
</style>