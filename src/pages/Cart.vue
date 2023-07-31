<template>
  <div class="cart">
    <header class="cart-header">
      <h3>购物车</h3>
      <button @click="$emit('close')">关闭</button>
    </header>
    <ul class="cart-items">
      <li v-for="item in items" :key="item.id">
        <span>{{ item.name }} x {{ item.quantity }}</span>
        <span class="item-price">{{ item.price * item.quantity }} 元</span>
      </li>
    </ul>
    <div v-if="items.length === 0" class="cart-empty">购物车为空</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.cart {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: 10px;
  overflow-y: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: bold;
}

.cart-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart-items li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.cart-items li:last-child {
  border-bottom: none;
}

.item-price {
  font-weight: bold;
}
.cart-empty {
  text-align: center;
  margin-top: 50%;
  opacity: 0.5;
}
</style>