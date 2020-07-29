<template>
	<div class="navbar">
		<div class="navbar-logo">
			<img src="../assets/img/logo.png" height="55px">
			<i @click="handleclick" class="el-icon-s-fold"></i>
		</div>
		<div class="navbar-select">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#31404E" text-color="#fff" active-text-color="#ffd04b">
				<el-submenu index="1">
					<template slot="title">
						<span class="el-dropdown-link" v-model="person">
							<el-avatar :src="person.avatar" :size='30' class="img"></el-avatar>
							{{person.username}}
						</span>
					</template>
					<el-menu-item index="1-1">消息</el-menu-item>
					<el-menu-item index="1-2">设置</el-menu-item>
					<el-menu-item index="1-3">退出</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>

<script>
	import { Admin } from '@/api/index'
	export default {
		data() {
			return {
				person: [],
			}
		},
		created() {
			//获取数据
			this.loadinfo();
		},
		methods: {
			handleclick() {
				this.$emit('change');
			},
			async loadinfo() {
				var id = sessionStorage.id;
				console.log(id)
				let { status, data } = await Admin.api({ id });
				if (status) {
					this.person = data;
					console.log(this.person)
				}

			},
		}
	}
</script>

<style>
	.navbar {
		background-color: #31404E;
		height: 60px;
		color: white;
		line-height: 60px;
		padding-left: 20px;
		display: flex;
		justify-content: space-between;
		padding-right: 20px;
	}

	.navbar-logo {
		height: 60px;
		box-sizing: border-box;
	}

	.el-icon-s-fold {
		position: absolute;
		top: 21px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #fff;
		line-height: 60px;
		vertical-align: middle;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.el-avatar {
		/* position: absolute;
		top: 13px;
		right: 100px; */
		margin-right: 5px;
	}
</style>