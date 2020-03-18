import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const login = () => import('@/components/Login')
const home = () => import('@/components/Home')
const router = new VueRouter({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
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
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login');
  next();

})
export default router