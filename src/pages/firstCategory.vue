<template>
  <div class="container">
    <div class="banner">
      <img src="/beijing.jpg" alt="" class="banner-img">
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <el-button type="primary" @click="showDialog = true">立即购买</el-button>
      </div>
    </div>
    <el-dialog title="购买商品" :visible.sync="showDialog">
      <div class="dialog-content">
        <h3>{{ product.name }}</h3>
        <p>价格：{{ product.price }}元</p>
        <div class="quantity-selector">
          购买数量：
          <el-input-number v-model="quantity" :min="1" :max="999"></el-input-number>
        </div>
        <div class="total-price">
          总价：{{ totalPrice }}元
        </div>
        <el-button type="primary" @click="confirmPurchase">确认购买</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog, Button, InputNumber } from 'element-ui';

export default {
  components: {
    'el-dialog': Dialog,
    'el-button': Button,
    'el-input-number': InputNumber,
  },
  data() {
    return {
      product: {
        name: '',
        description: '我见青山多妩媚',
        price: 632,
      },
      showDialog: false,
      quantity: 1,
    };
  },
  computed: {
    totalPrice() {
      return this.product.price * this.quantity;
    },
  },
  methods: {
    confirmPurchase() {
      alert(`购买成功！总价：${this.totalPrice}元`);
      this.showDialog = false;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-left: -13px;
}

.banner {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.banner-img {
  max-width: 100%;
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.banner:hover .banner-img {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  z-index: -1;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}

.banner-text h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.banner-text p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.banner-text button {
  width: 180px;
  height: 50px;
  font-size: 18px;
  border-radius: 25px;
}

.dialog-content {
  text-align: center;
}

.quantity-selector {
  margin-bottom: 10px;
}

.total-price {
  margin-bottom: 20px;
}
</style>
