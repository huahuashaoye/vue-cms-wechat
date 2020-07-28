<template>
	<el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
	 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="height: calc(100vh - 60px);">

		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>商品管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/commodity/category">商品分类</el-menu-item>
				<el-menu-item index="/commodity/release">发布商品</el-menu-item>
				<el-menu-item index="/commodity/list">商品列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>

		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>订单管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/order/list">订单列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>

		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>账户设置</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/admin/Information">账户信息</el-menu-item>
			</el-menu-item-group>
		</el-submenu>


		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/admin/list">
					用户列表
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>

		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span>权限设置</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/rolo/list">
					用户角色
				</el-menu-item>
				<el-menu-item index="/menu/list">
					菜单权限
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>


	</el-menu>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) { 
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>

</style>
