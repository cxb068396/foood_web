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


// const helloworld = () => import('@/components/HelloWorld')
// const temperatureinput = () => import('@/components/temperatureInput')
// const temperatureshow = () => import('@/components/temperatureShow')

// const routers = [
//   {
//     path:"/",
//     redirect: '/helloworld'
//   },
//   {
//     path: '/helloworld',
//     name: 'helloworld',
//     component: helloworld
//   },
//   {
//     path: '/temperatureinput',
//     name: 'temperatureinput',
//     component: temperatureinput
//   },
//   {
//     path: '/temperatureshow',
//     name: 'temperatureshow',
//     component: temperatureshow
//   }
// ]
// const router = new router({
// 	routers
// })
new Vue({
  render: h => h(App),
  router,
  // echarts,
}).$mount('#app')