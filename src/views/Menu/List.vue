<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load='loadNode' lazy node-key="id" :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-popover placement="left-start" width="100" trigger="hover" :popper-class='data.icon'>
							<el-button type="text" slot="reference" :icon="data.icon" :disabled="node.level==1" size="mini" @click="dialogFormVisible = true">
								图标
							</el-button>
						</el-popover>
						<el-button type="text" @click.stop='openEditModal(node,data)' icon="el-icon-edit" :disabled="node.level==1" size="mini">
							编辑
						</el-button>
						<el-button type="text" @click.stop='openAddModle(node,data)' icon="el-icon-plus" size="mini">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click="remove(node, data)">
							删除
						</el-button>
						<span class="num">显示序号：</span>
						<el-tag style="width: 40px;">{{data.order}}</el-tag>
					</span>
			
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click='cancel'>取 消</el-button>
				<el-button type="primary" @click='handleInsertNode'>添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click='cancel'>取 消</el-button>
				<el-button type="primary" @click='handleUpdateNode'>保 存</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { Menu } from '@/api/index';
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					pId: '',
					name: '',
					path: '',
					order: '',
				},
				editForm: {
					id: '',
					name: '',
					path: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},

		methods: {
			// append(data) {
			// 	const newChild = { id: id++, label: 'testtest', children: [] };
			// 	if (!data.children) {
			// 		this.$set(data, 'children', []);
			// 	}
			// 	data.children.push(newChild);
			// },


			async loadNode(node, resolve) {
				//node:节点对象
				//resolve:返回下一级节点数据的方法

				if (node.level == 0) {
					let { status, data } = await Menu.sub({ pId: 0 });
					return resolve(data);
				}
				console.log(node);
				//父级节点pId
				let pId = node.data.id;
				//获取子节点数据
				let { status, data } = await Menu.sub({ pId });
				if (status) {
					data.forEach(function(item, index) {
							item.icon = 'el-icon-' + item.icon;
						})
						return resolve(data);
					}
				},
				//node代表节点对象，data代表的是节点数据
				//添加model
				openAddModle(node, data) {
						// console.log(node,data);
						this.node = node; //父节点的node节点对象
						this.insertForm.pId = data.id;
						this.insertModalShow = true;
					},
					//打开编辑Modal
					openEditModal(node, data) {
						this.editForm = { ...data };
						this.node = node;
						this.editModalShow = true;
					},
					cancel() {
						this.editModalShow = false;
						this.insertModalShow = false;
					},
					//编辑节点
					async handleUpdateNode() {
							let { status, data, msg } = await Menu.edit({ ...this.editForm });
							if (status) {
								this.$message.success(msg);
								//更新节点
								this.node.data = this.editForm;
								this.editModalShow = false;
							}
						},
						//打开插入Modal
						openInsertModal(node, data) {
							this.node = node;
							this.insertForm.pId = data.id;
							this.insertModalShow = true;
						},
						//删除节点
						remove(node, data) {
							this.$confirm('此操作将永久删除该文件,是否继续?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(async () => {
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								let { status, msg } = await Menu.remove({ ...data })
								if (status) {
									this.$refs.tree.remove({ ...data });
									this.$message.success(msg);

								}
							}).catch(() => {
								this.$message.info('删除失败');
							});
						},

						//插入节点
						async handleInsertNode() {
							//1.表单校验
							//2.ajax
							let { status, data } = await Menu.insert({ ...this.insertForm });
							if (status) {
								this.$message.success("添加成功");
								// 插入新的tree节点
								this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
								this.insertModalShow = false;
							}
						}
			}
		};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
