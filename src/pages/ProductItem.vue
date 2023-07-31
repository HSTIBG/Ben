<template>
  <div class="product-item" :class="{ 'out-of-stock': !item.inStock }">
    <img :src="item.image" :alt="item.name" />
    <div class="product-details">
      <h4>{{ item.name }}</h4>
      <p v-if="item.inStock">价格：{{ item.price }} 元</p>
      <p v-else>已售罄</p>
      <button
        @click="addToCart"
        :disabled="!item.inStock"
        :class="{ disabled: !item.inStock }"
      >
        {{ item.inStock ? '加入购物车' : '已售罄' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.item);
    },
  },
};
</script>

<style scoped>
.product-item {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.product-item img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 20px;
}

.out-of-stock {
  opacity: 0.5;
  pointer-events: none;
}

.product-details h4 {
  font-size: 20px;
  margin-bottom: 10px;
}

.product-details p {
  font-size: 16px;
  margin-bottom: 10px;
}

.disabled {
  background-color: #ccc;
  cursor: default;
}
</style>