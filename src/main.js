import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line
import App from './App.vue'
import Buefy from 'buefy'
import VueResource from 'vue-resource'
import './assets/scss/app.scss'

Vue.use(VueResource)
Vue.use(Buefy)
Vue.use(VueRouter)


Vue.config.productionTip = false
// import HelloWorld from './components/HelloWorld'
import Home from './components/pages/Home'
import Menu from './components/pages/Menu'

const routes = [
    {path: '/', component: Home},
    {path: '/menu', component: Menu},
]
const router = new VueRouter({
    mode: 'history',
    routes
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
