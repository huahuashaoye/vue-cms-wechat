<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="30" ></el-table-column>
			<el-table-column prop="" label="" width="580">
				<template scope="scope">
					<el-table :data="scope.row.goodsList"  style="width: 100%">
						<el-table-column prop="status" label="商品" width="400" >
							<template scope="scope">
								<div>
									<img :src="scope.row.img_md" width="50" height="50" class="head_pic" />
								</div>
								<div class="detail">
									<span>{{scope.row.name}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="goods_price" label="单价" >
						</el-table-column>
						<el-table-column prop="goods_num" label="数量" width="50">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="payment" label="付款总额" width="80">
			</el-table-column>
			<el-table-column prop="create_time" label="下单时间" sortable>

			</el-table-column>
			<el-table-column prop="status" label="状态" sortable width="120">

			</el-table-column>
			<el-table-column prop="time" label="操作" width="60">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain><i class="el-icon-edit"></i></el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Order } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],

			}
		},
		created() {
			//获取列表数据
			this.loadList();
		},
		methods: {

			async loading() {
				let { status, data } = await Order.list();
				if (!status) { return }
				this.tableData = data;
			},
			
			
			//加载列表数据
			async loadList() {
				let { status, total, data } = await Order.list({ pagesize: 10, pageindex: 1 });
				if (status) {
					// this.loading.close();
					this.tableData = data;
					// data.forEach(function(item) {
					// 	item.avatar = 'http://localhost:3001/' + item.avatar.replace('../', '');
					// })
				}
			},

			//删除
			removeRole(id, index) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						//删除角色
						let { status, data } = await Order.remove({ id });
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
	.content_box {
		box-shadow: 0 0 4px 1px #ddd;
		padding: 0 20px;

	}
</style>
