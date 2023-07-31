<template>
  <div class="aftersales-page">
    <h1 class="page-title">售后服务</h1>

    <div class="aftersales-form">
      <h2 class="form-title">提交售后申请</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="order-number">订单号</label>
          <input type="text" id="order-number" v-model="orderNumber" required>
        </div>
        <div class="form-group">
          <label for="reason">售后原因</label>
          <select id="reason" v-model="reason" required>
            <option value="">请选择</option>
            <option value="refund">退款</option>
            <option value="exchange">换货</option>
            <option value="repair">维修</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">问题描述</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">售后图片</label>
          <input type="file" id="image" @change="handleImageUpload" accept=".jpg, .jpeg, .png">
        </div>
        <button type="submit" class="submit-btn">提交</button>
      </form>
    </div>

    <div class="aftersales-history">
      <h2 class="history-title">售后记录</h2>
      <div class="search-bar">
        <input type="text" v-model="searchKeyword" placeholder="搜索订单号或售后原因">
      </div>
      <ul class="history-list">
        <li v-for="record in filteredAftersalesHistory" :key="record.id" class="history-item" :class="{ 'fade-in': record.isNew }">
          <div class="record-info">
            <span class="order-number">订单号: {{ record.orderNumber }}</span>
            <span class="reason">原因: {{ record.reason }}</span>
          </div>
          <div class="record-description">{{ record.description }}</div>
          <div class="record-image" v-if="record.image">
            <img :src="record.image" alt="售后图片">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: '',
      reason: '',
      description: '',
      searchKeyword: '',
      aftersalesHistory: []
    };
  },
  computed: {
    filteredAftersalesHistory() {
      return this.aftersalesHistory.filter(record => {
        return record.orderNumber.includes(this.searchKeyword) || record.reason.includes(this.searchKeyword);
      });
    }
  },
  methods: {
    submitForm() {
      this.aftersalesHistory.push({
        id: Date.now(),
        orderNumber: this.orderNumber,
        reason: this.reason,
        description: this.description,
        image: this.image,
        isNew: true
      });

    
      this.orderNumber = '';
      this.reason = '';
      this.description = '';
      this.image = '';

    
      this.$nextTick(() => {
        const historyList = this.$el.querySelector('.history-list');
        historyList.scrollTop = historyList.scrollHeight;
      });
    },
    handleImageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>
.aftersales-page {
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.aftersales-form {
  margin-bottom: 40px;
}

.form-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.aftersales-history {
  max-width: 800px;
  margin: 0 auto;
}

.history-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.search-bar {
  margin-bottom: 10px;
}

.search-bar input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.history-list {
  list-style: none;
  padding: 0;
}

.history-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-in {
  opacity: 1;
}

.record-info {
  margin-bottom: 10px;
}

.record-info span {
  margin-right: 10px;
}

.record-description {
  white-space: pre-wrap;
}

.record-image img {
  max-width: 100%;
}
</style>
