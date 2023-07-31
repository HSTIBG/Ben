<template>
  <div class="jd-container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
 <header class="jd-header">
      <div class="jd-logo">
        <img src="../pages/shangpin/edge.png" alt="logo" />
      </div>
      <nav class="jd-nav">
        <ul>
          <li><a href="#">商品展示页面</a></li>
        </ul>
      </nav> 
     
      <div class="jd-cart-icon" @click="showCart = !showCart">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">{{ cartItems.length }}</span>
      </div>
     
      <cart v-if="showCart" :items="cartItems" @close="showCart=false"></cart>
    
	<button class="login-btn" @click="goToLoginPage">管理员</button>
    </header>
    <div class="jd-product-list">
      <product-item
        v-for="product in products"
        :key="product.id"
        :item="product"
        @add-to-cart="addToCart"
      ></product-item>
    </div>
  </div>
</template>

<script>

import ProductItem from '../pages/ProductItem.vue';
import Cart from '../pages/Cart.vue';

export default {
  components: {
    ProductItem,
    Cart,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: '帆船',
          image: require('../assets/1.png'),
          price: 10.99,
          inStock:true
        },
        {
          id: 2,
          name: '海石',
          image: require('../assets/tup.jpg'),
          price: 19.99,
          inStock:true
        },
        {
          id: 3,
          name: '海滩',
          image: require('../assets/sp/haitao.jpg'),
          price: 30.50,
          inStock: true
        },
        {
          id: 4,
          name: '沙滩',
          image: require('../assets/sp/shatan.jpg'),
          price: 20.00,
          inStock: false
        },
        {
          id: 5,
          name: '九海',
          image: require('../assets/sp/sic.jpg'),
          price: 32.02,
          inStock: false
        },
        {
          id: 6,
          name: '晚霞',
          image: require('../assets/sp/wanxia.jpg'),
          price: 19.99,
          inStock: true
        },
        {
          id: 7,
          name: '夕阳',
          image: require('../assets/sp/xiy.jpg'),
          price: 25.63,
          inStock: true
        },
        {
          id: 8,
          name: '枫叶',
          image: require('../assets/sp/fengye.jpg'),
          price: 28.33,
          inStock: true
        },
        {
          id: 9,
          name: '雪山',
          image: require('../assets/sp/xueshan.jpg'),
          price: 29.63,
          inStock: true
        },
      ],
      cartItems: [],
      showCart: false,
      showLogin: false,
    };
  },
  methods: {
    addToCart(item) {
      const cartItem = this.cartItems.find((i) => i.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },
	goToLoginPage() {
      this.showLogin = true;
    },
  },
  watch: {
    
    showLogin(val) {
      if(val){
        this.$router.push('/login');
      }
    }
  },
};
  
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swa');

.jd-container {
  font-family: 'Montserrat', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.jd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.jd-logo img {
  height: 40px;
}

.jd-nav ul {
	
  display: flex;
  list-style: none;
  padding-left: 0;
  font-size: 35px;
}

.jd-nav a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.jd-nav a:hover {
  background-color: #f5f5f5;
}

.jd-cart-icon {
  position: relative;
  cursor: pointer;
}

.jd-cart-icon .fa-shopping-cart {
  font-size: 24px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  background-color: #ff4d4d;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.jd-product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin: 20px 0;
}


@media (max-width: 767px) {
  .jd-nav {
    display: none;
  }
  .jd-cart-icon {
    margin-right: 10px;
  }
  .jd-header {
    flex-direction: column;
    padding: 20px;
  }
  .jd-logo img {
    margin-bottom: 10px;
  }
  .cart-count {
    top: -12px;
    right: -12px;
    font-size: 10px;
  }
  .jd-product-list {
    grid-template-columns: 1fr;
  }
}

/* 登录弹窗样式 */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  font-size: 20px;
}

.login-modal h2 {
  margin-bottom: 20px;
}

.login-modal input {
  margin-bottom: 10px;
}

.login-modal button {
  background-color: #ff4d4d;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 登录按钮样式 */
.login-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
