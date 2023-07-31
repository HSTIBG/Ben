import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import iView from 'iview';
import 'iview/dist/styles/iview.css';


import 'bootstrap/dist/css/bootstrap.min.css';




Vue.use(ElementUI);
Vue.use(iView);



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
