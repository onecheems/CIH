// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI);
Vue.use(axios)
axios.defaults.baseURL='http://129.204.80.144:7001/'
Vue.prototype.$http = axios
Vue.config.productionTip = false


// 防抖处理(间隔指定时间触发一次)
// const on = Vue.prototype.$on
// Vue.prototype.$on = function (event, func) {
//   let timer
//   let newFunc = func
//   if (event === 'click') {
//     newFunc = function () {
//       clearTimeout(timer)
//       timer = setTimeout(function () {
//         func.apply(this, arguments)
//       }, 1000)
//     }
//   }
//   on.call(this, event, newFunc)
// }

export function createApp() {
  const app = new Vue({
    router,
    render: h => h(App)
  });
  return { app };
}
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
