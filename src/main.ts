import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import routes from './router'
import store from './store'
import HomeView from './views/HomeView.vue'
import actions from './actions'

Vue.use(VueRouter)

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
const routes: any = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/AboutView.vue')
  }
]

let router: any = null
let instance: any = null
function render (props?: any) {
  const { container } = props
  console.log('乾坤中...', container)
  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }
  router = new VueRouter({
    // 如果在乾坤的微前端中，那么这个路由就是 主应用定义的那个路由 这里是micvue2
    base: (window as any).__POWERED_BY_QIANKUN__ ? '/micvue2' : '/',
    // base: (window as any).__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    data () {
      return {
        store: {}// 这可以接收主应用初始化过来的state,通过props拿到数据
      }
    },
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap (props: any) {
  console.log('micvue2 bootstrap', props)
}
export async function mount (props: any) {
  console.log('micvue2 mount', props)
  props?.setLoading(false)
  render(props)
  // 注册观察者函数   获取主应用传递过来的参数
  // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
  props.onGlobalStateChange((state: any) => {
    const { userInfo } = state
    if (userInfo) {
      // localStorage.setItem('ACCESS_TOKEN', token)
      console.log('用户信息：', userInfo, state)
    }
  }, true)
}
export async function unmount (props: any) {
  console.log('micvue2 unmount', props)
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}

// 应用加载之前
// async bootstrap(props: any) {
//   console.log('app1 bootstrap', props);
// },
// // 应用 render 之前触发
// async mount(props: any) {
//   console.log('app1 mount', props);
// },
// // 应用卸载之后触发
// async unmount(props: any) {
//   console.log('app1 unmount', props);
// },
