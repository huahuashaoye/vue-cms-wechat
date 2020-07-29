<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单权限</span>
			</div>
			<div class="text item">
				<el-alert title="Tips" type="warning" :closable="false" description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。"
				 show-icon>
				</el-alert>
				<!-- 树形组件 -->
				<el-tree ref="tree" :load='loadNode' lazy node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
					<span class="custom-tree-node tree_box" slot-scope="{ node,data }">
						<span>{{ node.label }}</span>
						<span>
							<el-popover placement="left-start" width="100" trigger="hover" :popper-class='data.icon'>
								<el-button type="text" slot="reference" :icon="data.icon" :disabled="node.level==1" size="mini" @click="showIcon(node,data)">
									图标
								</el-button>
							</el-popover>
							<el-button type="text" @click.stop='openEditModle(node,data)' icon="el-icon-edit" :disabled="node.level==1" size="mini">
								编辑
							</el-button>
							<el-button type="text" @click.stop='openAddModle(node,data)' icon="el-icon-plus" size="mini">
								添加
							</el-button>
							<el-button type="text" icon="el-icon-delete" size="mini" @click="remove(node, data)" :disabled="node.level==1">
								删除
							</el-button>
							<span class="num">显示序号：</span>
							<el-tag style="width: 45px;">{{data.order}}</el-tag>
						</span>
					</span>
				</el-tree>
			</div>
		</el-card>
		<!-- 编辑 -->
		<el-dialog title="编辑节点" :visible.sync="dialogFormVisibleEdit">
			<el-form :model="editForm">
				<el-form-item label="菜单名称" :label-width="formLabelWidth">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" :label-width="formLabelWidth">
					<el-input v-model="editForm.path" autocomplete="off" placeholder="指定此菜单的链接地址,选填"></el-input>
				</el-form-item>
				<el-form-item label="显示序号" :label-width="formLabelWidth">
					<el-input v-model="editForm.order" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
				<el-button type="primary" @click="submitEdit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加 -->
		<el-dialog title="添加节点" :visible.sync="dialogFormVisibleAdd">
			<el-form :model="insertForm">
				<el-form-item label="菜单名称" :label-width="formLabelWidth">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" :label-width="formLabelWidth">
					<el-input v-model="insertForm.path" autocomplete="off" placeholder="指定此菜单的链接地址,选填"></el-input>
				</el-form-item>
				<el-form-item label="显示序号" :label-width="formLabelWidth">
					<el-input v-model="insertForm.order" autocomplete="off" placeholder="显示顺序按照数字从小到大,如2001"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="submitAdd">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 图标 -->
		<el-dialog title="选择图标" :visible.sync="dialogFormVisible">
			<ul class="icon">
				<li class="floor" v-for="(item,index) in iconForm" @click='isChecked(index,item)' :key="item.id" :class="{checked: item.checked == true}">
					<div style="width:100%;height:100%">
						<i :class="item.name"></i>
						<p>{{item.name}}</p>
					</div>
				</li>
			</ul>
			<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="1" layout="->,prev, pager, next"
			 :total="10">
			</el-pagination>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleIcon">添 加</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Menu } from '@/api/index'
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
					order: ''
				},
				editForm: {
					id: '',
					name: '',
					path: '',
				},
				iconForm: [],
				nodeData: {}, //节点数据
				node: {}, //节点
				dialogFormVisibleEdit: false,
				dialogFormVisibleAdd: false,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				iconAddForm: {
					id: '',
					icon: ''
				},
				currentPage1: 1,
				pagesize:30,
				pageindex:1
			}
		},
		methods: {
			append(data) {
				const newChild = { id: id++, label: 'testtest', children: [] };
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},
			
			//获取图标
			async showIcon(node, data) {
				this.iconAddForm.id = data.id;
				this.data = data;
				this.dialogFormVisible = true;
				let { status, icons } = await Menu.geticon({ pageSize: 30, pageIndex: 1 })
				if (status) {
					this.iconForm = icons;
					this.iconForm.forEach((item) => {
						item.name = 'el-icon-' + item.name;
						item.checked = false;
					})
				}
			},
			async handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pageindex = val;
				let size = this.pagesize;
				let { status, icons } = await Menu.geticon({ pageSize: size, pageIndex: val });
				if (status) {
					this.iconForm = icons
					this.iconForm.forEach((item) => {
						item.name = 'el-icon-' + item.name
						item.checked = false
					})
				}
			},
			// 添加图片
			async handleIcon() {
				// console.log(data)
				for (var i = 0; i < this.iconForm.length; i++) {
					if (this.iconForm[i].checked == true) {
						this.iconAddForm.icon = this.iconForm[i].id
					}
				}
				let { status, msg } = await Menu.icon(this.iconAddForm);
				if (status) {
					this.data.icon = this.item.name
					this.$message.success(msg);
					this.dialogFormVisible = false;
				}
			},
			//点击事件
			isChecked(i, item) {
				this.item = item;
				this.$forceUpdate(this.iconForm[i].checked = true);
				for (var j = 0; j < this.iconForm.length; j++) {
					if (i != j) {
						this.iconForm[j].checked = false;
					}
				}
			},
			//获取tree
			async loadNode(node, resolve) {
				//节点对象node
				//返回节点数据resolve
				// console.log(node,resolve);

				if (node.level == 0) {
					let { satus, data } = await Menu.menuInfo({ pId: 0 });
					return resolve(data);

				}
				//父级节点id
				let pId = node.data.id;
				let { status, data } = await Menu.menuInfo({ pId });
				if (status) {
					data.forEach(function(item, index) {
						item.icon = 'el-icon-' + item.icon;
					})
					return resolve(data);
				}
			},
			//打开编辑
			openEditModle(node, data) {
				console.log(data);
				this.dialogFormVisibleEdit = true;
				this.editForm = { ...data };
				this.editForm.id = data.id;
				this.node = node;

			},
			//编辑提交
			async submitEdit() {
				let { status } = await Menu.edit({ ...this.editForm });
				if (status) {
					this.$message.success('编辑成功');
					this.dialogFormVisibleEdit = false;
					console.log(this.node);
					this.node.data = this.editForm;
				}
			},
			//打开添加
			openAddModle(node, data) {
				this.dialogFormVisibleAdd = true;
				this.insertForm.pId = data.id;
				this.node = node;
				// console.log(data);
			},
			//添加提交
			async submitAdd() {
				let { status, data } = await Menu.insertMenu({ ...this.insertForm });
				if (status) {
					this.$message.success('添加成功');
					console.log(data);
					//把所有的参数都添加进去，data表示id，传参需要id，所以要加上data
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
				}
			},
			//删除
			remove(node, data) {
				let id = data.id;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let { status } = await Menu.remove({ id });
					if (status) {
						this.$message.success('删除成功！');
						this.$refs.tree.remove({ ...data });
					}
				}).catch(() => {
					this.$message.info('取消删除')
				});
			},


		}
	}
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

	.num {
		font-size: 12px;
		margin-left: 10px;
	}

	.tree_box {
		margin-right: 0;
		display: flex;
		justify-content: space-between;
	}

	/* 图片样式 */
	.node-order {
		width: 100px;
		display: inline-block;
		font-size: 12px;
		margin-left: 10px;
	}

	.floor {
		/* width: 118px; */
		list-style: none;
		float: left;
		width: 10%;
		text-align: center;
		height: 100px;
		/* line-height: 100px; */
		color: #666;
		font-size: 10px;
		border-right: 1px solid #eee;
		border-bottom: 1px solid #eee;
		margin-right: -1px;
		margin-bottom: -1px;
	}

	.floor:hover {
		color: #5cb6ff;
	}

	.floor:hover i {
		color: #5cb6ff;
	}

	.floor i {
		display: block;
		font-size: 26px;
		margin-bottom: 10px;
		color: #606266;
		transition: color .15s linear;
		margin-top: 20px;
	}

	.floor p {
		display: inline-block;
		padding: 0 3px;
		height: 1em;
		transition: color .15s linear;
	}

	.icon {
		overflow: hidden;
		list-style: none;
		padding: 0 !important;
		border: 1px solid #eaeefb;
		border-radius: 4px;
	}

	.el-dialog {
		width: 72% !important;
	}

	.checked {
		background-color: #5cb6ff !important;
		color: #fff;
	}

	.checked i {
		color: #fff;
	}
</style>
