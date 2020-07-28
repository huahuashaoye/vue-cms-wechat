<template>
	<div>
		<el-container>
			<!-- 头部 -->
			<el-header style="padding: 0px;height: auto;">
				<NavBar></NavBar>
			</el-header>
			<el-container>
				<!-- 左菜单 -->
				<el-aside width="200px">
					<LeftMenu></LeftMenu>
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
		}
	}
</script>

<style>
</style>