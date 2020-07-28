<template>
	<div class="content_box">
		<span class="title">账户设置</span>

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>

			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>



			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="权限" prop="email">
				<template>
					<el-select v-model="ruleForm.role">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-form-item>

			<el-form-item label="头像" prop="avatar">
				<Upload :url='ruleForm.avatar' :action='action' @success='handleUploadSuccess($event)' @remove='ruleForm.avatar=""'></Upload>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
				
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Admin,Role } from '@/api/index';
	import Upload from '@/components/Upload.vue';
	export default {
		props: ['id'],
		components: {
			Upload,
		},
		data() {
			return {
				action:'/api/upload/avatar',
				type: 'avatar',
				options:[],
				ruleForm: {
					id: '',
					username: '',
					fullname: '',
					tel: '',
					sex: '',
					email: '',
					avatar: '',
					role_name:'',
					role:''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 6,
							message: '长度在 2 到 6 个字符',
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
						message: '请填写正确的手机号',
						trigger: 'blur',
	
					}]
	
				}
			};
		},
		created() {
			//$route与$router
			//console.log(this.$route.params.id);//路由对象
			//console.log(this.$router);//路由实例
			this.loadInfo(this.id);
			this.loadRole();
		},
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			//加载用户信息
			async loadInfo() {
				let id=sessionStorage.uid;
				let { status, data } = await Admin.api({ id });
				if (status) {
					this.ruleForm = data;
				}
			},
			//加载角色
			async loadRole(){
				let{status,data}=await Role.list();
				if(status){
					this.options=data;
				}
			},
			//头像上传成功
			handleUploadSuccess(res) {
				this.ruleForm.avatar = res.src;
			},
			//提交修改
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status } = await Admin.edit({...this.ruleForm});
						if (status) {
							this.$router.push({ path: '/admin/list' });
							this.$message.success('修改成功!');
						}
					} else {
						this.$message.info('未修改成功!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
	
		}
	}
</script>

<style>
	.content_box{
		
		
	}
	.demo-ruleForm {
		
		padding: 10px 0;
		margin: 0 185px 0 185px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.content_box {
		box-shadow: 0 0 4px 1px #ddd;
		padding: 0 20px;
	}

	.title {
		display: block;
		padding: 10px 0;
		position: relative;
	}

	.title::after {
		content: '';
		position: absolute;
		width: 103%;
		height: 1px;
		background-color: #ddd;
		bottom: 0;
		left: -20px;
	}
</style>
