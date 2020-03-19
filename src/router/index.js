import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import CookList from '../components/cook/CookList.vue'
import CookAdd from '../components/cook/CookAdd.vue'
import CategoryList from '../components/category/CategoryList.vue'
import CategoryAdd from '../components/category/CategoryAdd.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/cooklist',
          component: CookList
        },
        {
          path: '/cookadd',
          component: CookAdd
        },
        {
          path: '/categorylist',
          component: CategoryList
        },
        {
          path: '/categoryadd',
          component: CategoryAdd
        }
      ]
    }
  ]
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表哪个路径访问而来
  //next 是一个函数，表示放行
  // next（） 放行 next（‘login’）强制跳转
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login');
  next();

})
export default router