import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login'


Vue.use(VueRouter)

// 配置路由路线
const Router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        { // 商品管理
          path: 'ProductManage',
          name: 'ProductManage',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Product/ProductManage.vue')
        },
        { // 商品管理
          path: 'AddProduct',
          name: 'AddProduct',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Product/AddProduct.vue')
        },
        { // 账号管理 
          path: 'AccManage',
          name: 'AccManage',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Account/AccManage.vue')
        },
        { // 添加用户
          path: 'AddAcc',
          name: 'AddAcc',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Account/AddAcc.vue')
        },
        { // 修改密码
          path: 'ChangePswd',
          name: 'ChangePswd',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Account/ChangePswd.vue')
        },
        { // 添加库存
          path: 'AddStock',
          name: 'ChangePsAddStock',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Purchase/AddStock.vue')
        },
        { // 库存管理
          path: 'Stock',
          name: 'Stock',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Purchase/Stock.vue')
        },
        { // 销售列表
          path: 'SalesList',
          name: 'SalesList',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Shipment/SalesList.vue')
        },
        { // 商品出货
          path: 'commodityOut',
          name: 'commodityOut',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Shipment/commodityOut.vue')
        },
        { // 商品退货
          path: 'commodityBack',
          name: 'commodityBack',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Shipment/commodityBack.vue')
        },
        { // 销售统计
          path: 'SaleSta',
          name: 'SaleSta',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Sta/SaleSta.vue')
        },
        { // 进货统计
          path: 'StockSta',
          name: 'StockSta',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Sta/StockSta.vue')
        },
        { // 账号管理 Vip
          path: 'Acc',
          name: 'Acc',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Vip/Acc.vue')
        },
        { // 添加账号 Vip
          path: 'Add',
          name: 'Add',
          meta: { requiresAuth: true },
          component: () => import('./views/module/Vip/Add.vue')
        }
        
      ]
    }

  ]
})

// 配置路由守卫
// to 要去的地址
// from 来的地址
// next() 放行到要去的地址
// next('/url') 指定的地址
Router.beforeEach((to, from, next)=>{
  if(to.meta.requiresAuth){ // 如果需要验证
    // 取出token
    const token = localStorage.getItem('token') 
    if(token){ // 如果有token
      next()   // 放行
    } else{
      // 否则返回到登录
      next('/login')
    }
  } else{
    // 不需要验证 就直接放行
    next()
  }
})


export default Router
