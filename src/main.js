import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
//import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'

//http://127.0.0.1:8888/api/private/v1/


Vue.use(VueAxios, axios);

Vue.config.productionTip = false
Vue.use(router)
Vue.use(ElementUI);
// Vue.use(echarts);


// 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
})
new Vue({
  render: h => h(App),
  router,
  // echarts,
}).$mount('#app')