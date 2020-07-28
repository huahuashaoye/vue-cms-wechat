<template>
	<div class="register">
		
	</div>

</template>

<script>
	import {Admin} from '@/api/index';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: '',
					checkPass: '',
					fullname: '',
					sex: '',
					tel: '',
					email:'',
					checked:''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
							type:'string'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						type:'string',
						validator: validatePass,
						trigger: 'blur'
					},
					{
						pattern:/ *\d{6,}$/,
						message: '至少6位数字',
						trigger: 'blur'
					}
					],
					checkPass: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请填写手机号',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请填写邮箱',
						trigger: 'blur'
					}],
					checked:[{
						required: true,
						message: '请选择',
						trigger: 'change'
					}]

				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid)=>{
					if(!valid){
						return false;
					}else{
						let {status,msg}=await Admin.register({...this.ruleForm});
						if(status){
							this.$message.success(msg);
						}else{
							this.$message.success(msg);
						}
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style scoped>
	.register {
		width: 100vw;
		height: 100vh;
		background: url(../assets/img/login-bg.jpg) no-repeat center center;
		background-size: cover;
		position: relative;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 400px;
	}

	i {
		margin: 0;
	}

	p {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.box-card {
		position: absolute;
		top: 50%;
		left: 70%;
		transform: translateY(-50%);
	}
	
</style>
