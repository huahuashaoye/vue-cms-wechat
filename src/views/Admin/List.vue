<template>
	<div class="userlist">
		<el-card class="box-card">
			<div slot="header">
				<span>用户列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="#" type="index" width="50">
				</el-table-column>
				<el-table-column prop="avatar" label="头像" sortable>
					<template scope='scope'>
						<el-avatar :src="scope.row.avatar" class="list-avatar" width="80" alt=""></el-avatar>
					</template>
				</el-table-column>
				<el-table-column property="username" label="账号" sortable>
				</el-table-column>
				<el-table-column property="fullname" label="姓名" sortable>
				</el-table-column>
				<el-table-column property="sex" label="性别" sortable>
				</el-table-column>
				<el-table-column property="tel" label="手机" sortable>
				</el-table-column>
				<el-table-column property="role_name" label="角色" sortable>
					<template scope='scope'>
						<el-tag :class="{color:scope.row.role_name=='超级管理员'}">{{scope.row.role_name}}</el-tag>
					</template>

				</el-table-column>
				<el-table-column property="login_time" label="上次登录" width="200" sortable>
				</el-table-column>
				<el-table-column property="login_count" label="登录次数" sortable>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" plain @click="loadInfo(scope.row.id)"><i class="el-icon-edit"></i></el-button>
						<el-button class="rgtbtn" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)" plain><i
							 class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 编辑对话框 -->
		<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
			<el-form :model="form" ref='form' label-position='left' label-width='80px'>
				<el-form-item label="姓名">
					<el-input v-model="form.fullname" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="手机">
					<el-input v-model="form.tel" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="form.role">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="权限">
					<el-select v-model="form.role_name" >
						<template scope="scope">
						<el-option label="超级管理员" value="shanghai">{{scope.row.name}}</el-option>
						<el-option label="管理员" value="beijing"></el-option>
						<el-option label="运营人员" value="shanghai"></el-option>
						<el-option label="设计人员" value="beijing"></el-option>
						<el-option label="财务人员" value="shanghai"></el-option>
						<el-option label="仓库人员" value="beijing"></el-option>
						</template>
					</el-select>
				</el-form-item> -->
				<el-form-item label="头像">
					<Upload :url='form.avatar' :action='action' @success='handleUploadSuccess($event)' @remove='form.avatar=""'></Upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Admin, Rolo } from '@/api/index';
	import Upload from '@/components/Upload.vue';
	export default {
		components: {
			Upload
		},
		data() {
			return {
				// rules: {
				// 	fullname: [{
				// 			required: true,
				// 			message: '请输入用户名',
				// 			trigger: 'blur'
				// 		},
				// 		{
				// 			min: 3,
				// 			max: 20,
				// 			message: '长度在 3 到 20 个字符',
				// 			trigger: 'blur'
				// 		}
				// 	],
				// 	role_name: [{
				// 			required: true,
				// 			message: '请输入用户名',
				// 			trigger: 'blur'
				// 		},
				// 		{
				// 			min: 2,
				// 			max: 6,
				// 			message: '长度在 2 到 6 个字符',
				// 			trigger: 'blur'
				// 		}
				// 	],
				// 	sex: [{
				// 		required: true,
				// 		message: '请选择性别',
				// 		trigger: 'change'
				// 	}],
				// 	tel: [{
				// 		required: true,
				// 		message: '请填写正确的手机号',
				// 		trigger: 'blur',

				// 	}]
				// },
				options: [],
				tableData: [],
				dialogFormVisible: false,
				form: {
					fullname: '',
					role_name: '',
					tel: '',
					sex: '',
					email: '',
					avatar: '',
					role: '',
					id: ''
				},
				formLabelWidth: '120px',
				action: '/api/upload/avatar'
			}
		},
		created() {
			this.loadList();
			this.loadRoletist();

		},
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			async loadRoletist() {
				let { status, total, data } = await Rolo.list();
				if (status) {
					this.options = data;
					}
				},
				//加载列表数据
				async loadList() {
						let { status, data } = await Admin.list();
						if (status) {
							this.tableData = data;
						}
					},
					//删除
					async handleDelete(index, id) {
							let { status, data } = await Admin.del({ id });
							if (status) {
								this.tableData.splice(index, 1);
								this.$message.success('删除成功');
							}
						},
						//点击编辑
						async loadInfo(id) {
								this.dialogFormVisible = true;
								//获取数据
								let { status, data } = await Admin.info({ id });
								if (status) {
									this.form = data;
								}



							},
							//提交编辑
							submitForm(formName) {
								this.$refs[formName].validate(async (valid) => {
									if (valid) {
										let { status, msg } = await Admin.edit(this.form);
										if (status) {
											this.$message.success('修改成功!');
											this.dialogFormVisible = false;
											//更新DOM
											this.loadList();
										}
									} else {
										this.$message.info('修改失败!');
										return false;
									}
								});
							},
							//头像上传成功
							handleUploadSuccess(res) {
								console.log(res);
								this.form.avatar = res.src;
							},
			}


		}
</script>
<style>
	.userlist .rgtbtn {
		margin-left: 10px;
	}

	.userlist .color {
		background-color: #FEF0F0;
		color: #F66C81;
	}

	.userlist .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.userlist .avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.userlist .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.userlist .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
