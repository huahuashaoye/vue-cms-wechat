<template>
	<div class="header">
		<el-card class="box-card">
			<div class="title">
				<span>管理员角色</span>
				<el-button type="primary" @click="openInsertModal" plain>添加角色</el-button>
			</div>
			<el-table :data="tableData">
				<el-table-column prop="id" label="#">
				</el-table-column>
				<el-table-column label="身份" prop="name">
					<template scope="scope">
						<el-button type="primary" plain>{{scope.row.name}}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					
					<!-- <template slot-scope="scope">
						<el-link class="router-edit">
							<el-button size="mini" type="primary" plain @click='handledit(scope.row.id,scope.row.name,scope.$index)'><i
								 class="el-icon-edit"></i></el-button>
						</el-link>
						<el-button class="rgtbtn" size="mini" type="danger" @click="removeRole(scope.row.id,scope.$index)" plain><i class="el-icon-delete"></i></el-button>
					</template>
 -->

					<template slot-scope="scope">
						<el-button @click='handledit(scope.row.id,scope.row.name,scope.$index)' type="primary" plain :disabled='scope.row.name==="超级管理员"'><i
							 class="el-icon-edit"></i></el-button>
						<el-button type="danger" @click="removeRole(scope.row.id,scope.$index)" plain :disabled='scope.row.name==="超级管理员"'><i
							 class="el-icon-delete"></i></el-button>
						<el-button type="primary" plain icon="el-icon-setting"></el-button>
					</template>
					
					
					
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import { Rolo } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],

			}
		},
		created() {
			// this.loading = this.$loading();
			//获取列表数据
			this.loadList();
		},
		methods: {
			async loading() {
				let { status, data } = await Rolo.list();
				if (!status) { return }
				this.tableData = data;
			},
			handledit(id, name, idx) {
				this.$prompt('请输入修改后的角色名称', '添加角色', {
						inputPattern: /\S/,
						inputErrorMessage: '角色名称不能为空',
						inputValue: name
					})
					.then(async ({ value }) => {
						var data = {};
						data.name = value;
						data.id = id;
						console.log(data);
						let { status, msg } = await Rolo.edit({ ...data });
						if (!status) { return false }
						this.$message.success(msg);
						this.tableData[idx].name = value;

					})
					.catch(({ value }) => {
						this.$message.error("已取消")
					})
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			//加载列表数据
			async loadList() {
				let { status, total, data } = await Rolo.list();
				if (status) {
					// this.loading.close();

					this.tableData = data;

				}

			},
			//添加角色
			openInsertModal() {
				this.$prompt("请输入添加的角色名称", {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符'

					})
					.then(async ({ value }) => {
						let { status, data } = await Rolo.insert({ name: value });
						if (status) {
							this.tableData.push({ name: value, ...data });
							this.$message.success('添加成功');

						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					});

			},
			//删除
			removeRole(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						//删除角色
						let { status } = await Rolo.remove({ id });
						if (status) {
							//更新DOM
							this.tableData.splice(index, 1);
							this.$message.info('删除成功')
						}

					})
					.catch(() => {
						this.$message.info('取消成功')
					});
			},
		}
	}
</script>


<style>
	.header {
		box-shadow: 0 0 4px 1px #ddd;

		width: 600px;
	}

	.title {
		display: block;
		padding: 20px 0;
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

	.el-button--mini {
		font-size: 12px;
		width: 50px;
		padding: 4px;
	}

	.el-button--mini {
		font-size: 12px;
		width: 50px;
		padding: 4px;
	}

	.title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
