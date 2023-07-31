<template>
	<div class="order-statistics-container">
	  <div class="filter-box">
		<el-form :inline="true" :model="filter" class="filter-form">
		  <el-form-item label="订单状态">
			<el-select v-model="filter.status" placeholder="请选择">
			  <el-option label="全部" value=""></el-option>
			  <el-option label="待付款" value="pending"></el-option>
			  <el-option label="已付款" value="paid"></el-option>
			
			  <el-option label="已完成" value="completed"></el-option>
			  <el-option label="已取消" value="canceled"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="时间范围">
			<el-date-picker v-model="filter.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <div class="chart-box">
		<el-row>
		  <el-col :span="8">
			<div class="chart-item">
			  <div class="chart-header">
				<div class="title">订单总量</div>
				<div class="subtitle"></div>
			  </div>
			  <div class="chart-body">
				<div class="chart-number">{{ chartData.totalOrders }}</div>
				<div class="chart-trend">
				  <el-tooltip content="上月同期" placement="top">
					<i class="el-icon-arrow-up"></i>
					<span class="trend-number">+10.2%</span>
				  </el-tooltip>
				</div>
			  </div>
			</div>
		  </el-col>
		  <el-col :span="8">
			<div class="chart-item">
			  <div class="chart-header">
				<div class="title">订单金额</div>
				<div class="subtitle"></div>
			  </div>
			  <div class="chart-body">
				<div class="chart-number">{{ chartData.totalRevenue }}</div>
				<div class="chart-trend">
				  <el-tooltip content="上周同期" placement="top">
					<i class="el-icon-arrow-up"></i>
					<span class="trend-number">+8.5%</span>
				  </el-tooltip>
				</div>
			  </div>
			</div>
		  </el-col>
		  <el-col :span="8">
			<div class="chart-item">
			  <div class="chart-header">
				<div class="title">平均客单价</div>
				<div class="subtitle"></div>
			  </div>
			  <div class="chart-body">
				<div class="chart-number">{{ chartData.averageOrderValue }}</div>
				<div class="chart-trend">
				  <el-tooltip content="上周同期" placement="top">
					<i class="el-icon-arrow-down"></i>
					<span class="trend-number">-2.1%</span>
				  </el-tooltip>
				</div>
			  </div>
			</div>
		  </el-col>
		</el-row>
	  </div>
	  <div class="table-box">
		<el-table :data="tableData" border stripe>
		  <el-table-column prop="orderNumber" label="订单编号"></el-table-column>
		  <el-table-column prop="status" label="订单状态"></el-table-column>
		  <el-table-column prop="customerName" label="客户姓名"></el-table-column>
		  <el-table-column prop="orderDate" label="下单时间"></el-table-column>
		  <el-table-column prop="totalAmount" label="订单金额"></el-table-column>
		  <el-table-column prop="paymentMethod" label="支付方式"></el-table-column>
		</el-table>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		filter: {
		  status: '',
		  dateRange: []
		},
		chartData: {
		  totalOrders: 0,
		  totalRevenue: 0,
		  averageOrderValue: 0
		},
		tableData: []
	  }
	},
	mounted() {
	  this.fetchChartData();
	  this.fetchTableData();
	},
	methods: {
	  fetchChartData() {
		
		this.chartData = {
		  totalOrders: 1250,
		  totalRevenue: 257890,
		  averageOrderValue: 206.31
		};
	  },
	  fetchTableData() {
		
		this.tableData = [
		  { orderNumber: '202101010001', status: '待付款', customerName: '张三', orderDate: '2021-01-01 10:00:00', totalAmount: 128.5, paymentMethod: '微信支付' },
		  { orderNumber: '202101010002', status: '已付款', customerName: '李四', orderDate: '2021-01-01 11:00:00', totalAmount: 256.8, paymentMethod: '支付宝支付' },
		  { orderNumber: '202101010003', status: '已完成', customerName: '王五', orderDate: '2021-01-01 12:00:00', totalAmount: 398.2, paymentMethod: '银行卡支付' },
		  { orderNumber: '202101010004', status: '已取消', customerName: '赵六', orderDate: '2021-01-01 13:00:00', totalAmount: 40.0, paymentMethod: '微信支付' },
		  { orderNumber: '202101010005', status: '待付款', customerName: '钱七', orderDate: '2021-01-01 14:00:00', totalAmount: 76.5, paymentMethod: '支付宝支付' }
		];
	  },
	  handleFilter() {
		
		console.log(this.filter);
		this.fetchChartData();
		this.fetchTableData();
	  }
	}
  }
  </script>
  
  <style scoped>
  .order-statistics-container {
	padding: 20px;
  }
  
  .filter-box {
	margin-bottom: 20px;
  }
  
  .chart-box {
	margin-bottom: 20px;
  }
  
  .chart-item {
	padding: 20px;
	border: 1px solid #e8e8e8; border-radius: 4px; background-color: #fff; }

.chart-header { font-size: 16px; font-weight: bold; margin-bottom: 10px; }

.chart-header .title { margin-right: 10px; }

.chart-header .subtitle { color: #999; }

.chart-body { display: flex; justify-content: space-between; align-items: center; }

.chart-number { font-size: 28px; font-weight: bold; }

.chart-trend { display: flex; align-items: center; }

.trend-number { margin-left: 5px; font-size: 14px; font-weight: bold; }

.table-box { background-color: #ccc; border: 1px solid #e8e8e8; border-radius: 4px; overflow: hidden; }

.el-table__body-wrapper { max-height: 400px; overflow-y: auto; }

.el-table__body { overflow: hidden; }

.el-table__header-wrapper { background-color: #f5f7fa; }

.el-table__row { cursor: pointer; }

.el-table__row:hover { background-color: #f5f5f5; } </style>
