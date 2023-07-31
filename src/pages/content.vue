<template>
	<div class="container">
	  <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
		<el-menu-item index="1" :class="{ animated: activeIndex === '1' }">
		  <i class="el-icon-menu"></i>
		  <span>商品列表</span>
		</el-menu-item>
		<el-menu-item index="2" :class="{ animated: activeIndex === '2' }">
		  <i class="el-icon-plus"></i>
		  <span>审核页面</span>
		</el-menu-item>
		<el-submenu index="3" :class="{ animated: activeIndex === '3' }">
		  <template slot="title">
			<i class="el-icon-s-goods"></i>
			<span>商品展示</span>
		  </template>
		  <el-menu-item index="3-1">青山绿影</el-menu-item>
		</el-submenu>
		<el-menu-item index="4" :class="{ animated: activeIndex === '4' }">
		  <i class="el-icon-s-data"></i>
		  <span>商品统计</span>
		</el-menu-item>
		<el-menu-item index="5" :class="{ animated: activeIndex === '5' }">
		  <i class="el-icon-s-order"></i>
		  <span>订单查询</span>
		</el-menu-item>
		<el-menu-item index="6" :class="{ animated: activeIndex === '6' }">
		  <i class="el-icon-user"></i>
		  <span>用户管理</span>
		</el-menu-item> 
		<el-menu-item index="7" :class="{ animated: activeIndex === '7' }">
       <i class="el-icon-truck"></i>
     <span>售后服务</span>
     </el-menu-item>

	  </el-menu>
	  <transition name="fade">
		<router-view></router-view>
	  </transition>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		activeIndex: '1',
	  };
	},
	methods: {
	  handleSelect(index) {
		this.activeIndex = index;
		switch (index) {
		  case '1':
			this.$router.push({ path: '/home' });
			break;
		  case '2':
			this.$router.push({ path: '/zhuanye' });
			break;
		  case '3-1':
			this.$router.push({ path: '/firstCategory' });
			break;
		  case '3-2':
			this.$router.push({ path: '/secondCategory' });
			break;
		  case '4':
			this.$router.push({ path: '/xinxi' });
			break;
		  case '5':
			this.$router.push({ path: '/xueke' });
			break;
		  case '6':
			this.$router.push({ path: '/bbt' });
			break;
		  case '7':
			this.$router.push({ path: '/bba' });
			break;
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  .container {
	height: 100%;
  }
  
  .menu {
	background-color: #f5f5f5;
	border-bottom: none;
	font-size: 16px;
	line-height: 24px;
	color: #333;
	padding: 0 20px;
  }
  
  .el-menu-item,
  .el-submenu__title {
	font-weight: 500;
  }
  
  .el-menu-item:hover,
  .el-submenu__title:hover {
	color: #409eff;
  }
  
  .el-submenu__title > .el-icon-arrow-down {
	transform: rotate(180deg);
	transition: transform 0.3s;
  }
  
  .el-submenu__title:hover > .el-icon-arrow-down {
	transform: rotate(0);
  }
  
  .el-submenu__popover {
	top: 44px !important;
	left: -1px !important;
  }
  
  .el-submenu__popover .el-menu {
	background-color: #fff;
	border: 1px solid #ebeef5;
	box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  }
  
  .el-menu--horizontal .el-menu-item + .el-menu-item,
  .el-menu-item-group + .el-menu-item,
  .el-menu-item + .el-submenu .el-submenu__title {
	margin-left: 40px;
  }
  
  /* 新增样式 */
  .el-menu-item {
	display: flex;
	align-items: center;
  }
  
  .el-menu-item__content {
	display: flex;
	align-items: center;
  }
  
  .el-menu-item__content span {
	margin-left: 5px;
  }
  
  .el-submenu__title {
	display: flex;
	align-items: center;
  }
  
  .el-menu--horizontal .el-submenu__title::after {
	top: 50% !important;
	transform: translateY(-50%);
  }
  
  .el-submenu__icon-arrow.el-icon-arrow-down:before {
	font-size: 12px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
	transition: opacity 0.5s;
  }
  
  .fade-enter,
  .fade-leave-to {
	opacity: 0;
  }
  
  .animated {
	animation-duration: 0.5s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: both;
  }
  
  @keyframes slideInLeft {
	from {
	  opacity: 0;
	  transform: translateX(-100%);
	}
	to {
	  opacity: 1;
	  transform: translateX(0);
	}
  }
  
  .slideInLeft {
	animation-name: slideInLeft;
  }
  </style>
  