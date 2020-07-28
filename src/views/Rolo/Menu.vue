<template>
	<div class="box">
		<el-card class="box-card">
			<div slot="header">
				<span>菜单权限</span>
			</div>
			<el-alert style="margin-bottom: 10px;" title="Tips" type="warning" description="设置后台管理系统的左侧菜单,目前至多支持两层菜单,三层以上菜单将不会显示."
			 show-icon>
			</el-alert>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load='loadNode' lazy node-key="id" :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-popover style="padding-right: 5px;" placement="left-start" width="100" trigger="hover" :popper-class='data.icon'>
							<el-button type="text" slot="reference" :icon="data.icon" :disabled="node.level==1" size="mini" @click="dialogFormVisible = true">
								图标
							</el-button>
						</el-popover>
						<el-button type="text" @click.stop="openEditModal(node,data)" icon="el-icon-edit-outline" :disabled="node.level==1"
						 size="mini">
							编辑
						</el-button>
						<el-button type="text" @click.stop="openAddModal(node,data)" icon="el-icon-plus" size="mini">
							添加
						</el-button>
						<el-button @click="deleteMenu(node,data)" type="text" icon="el-icon-delete" size="mini">
							删除
						</el-button>
						<span style="padding-left: 5px;">显示序号：
							<el-tag style="width: 45px;" size="mini">{{data.order}}</el-tag>
						</span>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加节点 -->
		<el-dialog title="添加节点" :visible.sync="insertModalShow">
			<el-form ref="insertForm" :model="insertForm">
				<el-form-item label="菜单名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" label-width="120px">
					<el-input v-model="insertForm.path" placeholder="指定此菜单的链接地址,选填" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" label-width="120px">
					<el-input v-model="insertForm.order" placeholder="显示顺序按照数字从小到大,如2001" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeAdd">取 消</el-button>
				<el-button type="primary" @click="handlerAdd('insertForm')">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑节点" :visible.sync="editModalShow">
			<el-form :rules="rules" :model="editForm">
				<el-form-item label="菜单名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" label-width="120px">
					<el-input placeholder="指定此菜单的链接地址,选填" v-model="editForm.path" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" label-width="120px">
					<el-input v-model="editForm.order" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeEdit">取 消</el-button>
				<el-button type="primary" @click="handlerEdit">确定</el-button>
			</div>
		</el-dialog>
		<!-- 图标 -->
		<el-dialog title="选择图标" :visible.sync="dialogFormVisible" >
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
	import { Auth } from '@/api/index.js'
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId: '',
					path: '',
					order: '',
				},
				editForm: {
					id: '',
					name: '',
					path: '',
					order: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
				iconModalShow: false,
				dialogFormVisible:false,
				iconForm: [],
				iconAddForm: {
					id:'',
					icon:'',
				},
				pagesize: 30,
				pageindex: 1,
				currentPage1:1,
				rules:{
					order:[
						{required: true, message: '请输入显示序号', trigger: 'blur'},
					]
				}
			}
		},
		created() {
			this.handleCurrentChange();
		},
		methods: {
			//获取子级分类
			async loadNode(node, resolve) {
				if (node.level == 0) {
					let { status, data } = await Auth.menu({ pId: 0 });
					return resolve(data);
				}
				//父级节点pId
				let pId = node.data.id;
				//获取子节点数据
				let { status, data } = await Auth.menu({ pId });
				if (status) {
					data.forEach(function(item, index) {
						item.icon = 'el-icon-' + item.icon;
					})
					return resolve(data);
				}
			},
			openEditModal(node, data) {
				this.editForm = { ...data };
				this.node = node;
				this.editModalShow = true;
			},
			async handlerEdit() {
				let { status, data, msg } = await Auth.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					//更新的树状结构
					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},
			closeEdit() {
				this.editModalShow = false;
			},
			openAddModal(node, data) {
				this.node = node;
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			handlerAdd(form) {
				this.$refs[form].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg, data } = await Auth.increase({ ...this.insertForm });
					if (status) {
						this.$message.success(msg);
						this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
						this.insertModalShow = false;
					} else {
						this.$message.error(msg);
					}
				});
			},
			closeAdd() {
				this.insertModalShow = false;
			},
			//删除
			deleteMenu(node, data) {
				this.$confirm('此操作将永久删除该菜单是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					let { status, msg } = await Auth.del({ ...data });
					if (status) {
						this.$refs.tree.remove({ ...data });
						this.$message.success('删除成功');
					}
				}).catch(() => {
					this.$message.info('删除失败');
				});
			},
			//设置子菜单图标
			async showIcon(node, data) {
				this.iconAddForm.id = data.id;
				this.data = data;
				this.dialogFormVisible = true;
				let { status, icons } = await Auth.subicon({ pageSize: 30, pageIndex: 1 })
				if (status) {
					this.iconForm = icons;
					this.iconForm.forEach((item) => {
						item.name = 'el-icon-' + item.name;
						item.checked = false;
					})
				}
			},
			async handleCurrentChange(val) {
				this.pageindex = val;
				let size = this.pagesize;
				let { status, icons } = await Auth.geticon({ pageSize: size, pageIndex: val });
				if (status) {
					this.iconForm = icons;
					this.iconForm.forEach((item) => {
						item.name = 'el-icon-' + item.name;
						item.checked = false;
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
				let { status, msg,data } = await Auth.subicon(this.iconAddForm);
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
		}
		
	}
</script>

<style lang="less" scoped="scoped">
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.box-card {
		width: 100%;
	}

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
		.el-dialog{
			width:72% !important;
		}
</style>
