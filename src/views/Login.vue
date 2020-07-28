<template>
	<div class="bg">
		<div class="content_box">
			<span class="title"> 登录</span>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
				<el-form-item label="账号:" prop="username">
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-key" v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item>
					<router-link to="">
						<el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
					</router-link>
				</el-form-item>
			</el-form>
			<div class="footer">
				<router-link to="/Register"> <span>注册账户</span> </router-link>
				<router-link to="/Register"><span>忘记密码</span></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { Admin } from '@/api/index';


	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
					],
					password: [{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 0, max: 15, message: '长度在0-15个字符', trigger: 'blur' }
					],
				},
			};
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					let { status, msg ,data} = await Admin.login({ ...this.ruleForm });
					if (status) {

						//成功提示

						//储存Token，uid，role
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						//成功提示
						this.$message.success(msg);
						let { redirect } = this.$route.query;
						
						if (redirect) {
							this.$router.replace('/article/list');
						} else {
							// 默认跳转
							this.$router.replace('/commodity/list');
						}
					} else {
						this.$message.error(msg);
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
	}
</script>

<style>
	.bg a {
		color: black;
	}

	.bg .footer {
		padding: 0 30px 20px 30px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
	}

	.bg .demo-ruleForm {
		padding: 10px 0 0 0;
		margin: 0 auto;
	}

	.bg .el-form-item {
		padding: 0 20px;
	}

	.bg .content_box {
		width: 300px;
		background-color: white;
		box-shadow: 0 0 4px 1px #ddd;
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translateY(-50%);
	}



	.bg .el-input__inner {
		position: relative;
	}

	.title {
		display: block;
		padding: 10px 10px;
		font-weight: bold;
		position: relative;
	}

	.title::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 1px;
		background-color: #ddd;
		bottom: 0;
		left: 0px;
	}

	.bg {
		background: url(../assets/img/login-bg.jpg) #337ab7;
		background-size: cover;
		width: 100vw;
		height: 100vh;
	}

	html,
	body {
		position: relative;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
	}
</style>
