<template>
	 <div class="audit-management">
    <h1>审核管理</h1>
    <div class="filter-bar">
      <input class="search-input" type="text" v-model="search" placeholder="搜索申请人" />
      <select class="filter-select" v-model="filter">
        <option value="">全部类型</option>
        <option v-for="type in actionTypes" :key="type">{{ type }}</option>
      </select>
    </div>
    <table class="audit-table">
      <thead>
        <tr>
          <th @click="orderBy('id')">ID<i :class="getClass('id')"></i></th>
          <th @click="orderBy('applicant')">申请人<i :class="getClass('applicant')"></i></th>
          <th @click="orderBy('date')">申请时间<i :class="getClass('date')"></i></th>
          <th @click="orderBy('type')">类型<i :class="getClass('type')"></i></th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody">
        <tr v-for="item in filteredAuditItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.applicant }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.type }}</td>
          <td>
            <span :class="getStatusClass(item.status)">
              {{ item.status }}
            </span>
          </td>
          <td>
            <button class="approve-button" @click="approve(item)" :disabled="item.status !== '待审批'">
              通过
            </button>
            <button class="reject-button" @click="reject(item)" :disabled="item.status !== '待审批'">
              拒绝
            </button>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auditItems: [
        { id: 1, applicant: '张三', date: '2022-01-01', type: '用户注册', status: '待审批' },
        { id: 2, applicant: '李四', date: '2022-01-02', type: '商品上架', status: '已通过' },
        { id: 3, applicant: '王五', date: '2022-01-03', type: '订单退款', status: '待审批' },
        { id: 4, applicant: '张三', date: '2022-01-01', type: '用户注册', status: '待审批' },
        { id: 5, applicant: '李四', date: '2022-01-02', type: '商品上架', status: '已通过' },
        { id: 6, applicant: '王五', date: '2022-01-03', type: '订单退款', status: '待审批' },
        { id: 7, applicant: '张三', date: '2022-01-01', type: '用户注册', status: '待审批' },
        { id: 8, applicant: '李四', date: '2022-01-02', type: '商品上架', status: '已通过' },
        { id: 9, applicant: '王五', date: '2022-01-03', type: '订单退款', status: '待审批' },
		
      ],
      filter: '',
      search: '',
      orderByField: '',
      orderByDesc: false,
    };
  },
	computed: {
	  filteredAuditItems() {
		let items = this.auditItems;
		if (this.filter) {
		  items = items.filter((item) => item.type === this.filter);
		}
		if (this.search) {
		  items = items.filter((item) =>
			item.applicant.toLowerCase().includes(this.search.toLowerCase())
		  );
		}
		if (this.orderByField) {
		  const compareFn = (a, b) => {
			let aValue = a[this.orderByField];
			let bValue = b[this.orderByField];
			if (typeof aValue === 'string') {
			  aValue = aValue.toLowerCase();
			  bValue = bValue.toLowerCase();
			}
			if (aValue < bValue) {
			  return this.orderByDesc ? 1 : -1;
			} else if (aValue > bValue) {
			  return this.orderByDesc ? -1 : 1;
			} else {
			  return 0;
			}
		  };
		  items = items.sort(compareFn);
		}
		return items;
	  },
	  actionTypes() {
		return [...new Set(this.auditItems.map((item) => item.type))];
	  },
	},
	methods: {
	  formatDate(date) {
		
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(date).toLocaleDateString('en-US', options);
	  },
	  getStatusClass(status) {
		return {
		  'status-pending': status === '待审批',
		  'status-approved': status === '已通过',
		  'status-rejected': status === '已拒绝',
		};
	  },
	  approve(item) {
	
		item.status = '已通过';
	  },
	  reject(item) {
		
		item.status = '已拒绝';
	  },
	  orderBy(field) {
		if (this.orderByField === field) {
		  this.orderByDesc = !this.orderByDesc;
		} else {
		  this.orderByField = field;
		  this.orderByDesc = false;
		}
	  },
	  getClass(field) {
		if (this.orderByField === field) {
		  return {
			'sort-icon': true,
			'sort-icon-desc': this.orderByDesc,
		  };
		} else {
		  return {
			'sort-icon': true,
			'sort-icon-disabled': true,
		  };
		}
	  },
	},
  };
  </script>
  
  <style scoped>
.audit-management {
  padding: 20px;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.search-input {
  height: 32px;
  width: 200px;
  padding: 4px 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.filter-select {
  height: 32px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.audit-table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  font-size: 14px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
th {
  position: relative;
  background-color: #f5f5f5;
  font-weight: bold;
  cursor: pointer;
}
.sort-icon {
  display: inline-block;
  margin-left: 4px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #ccc transparent transparent transparent;
  vertical-align: middle;
  cursor: pointer;
  opacity: 0.3;
}
.sort-icon-enabled {
  opacity: 1;
}
.sort-icon-desc {
  border-width: 0 5px 5px 5px;
  border-color: transparent transparent #ccc transparent;
}
.status-pending {
  color: orange;
}
.status-approved {
  color: green;
}
.status-rejected {
  color: red;
}
button {
  margin-right: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.approve-button {
  background-color: green;
  color: white;
}
.reject-button {
  background-color: red;
  color: white;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>