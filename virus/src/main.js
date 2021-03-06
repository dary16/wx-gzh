import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'amfe-flexible/index.js';
import components from './components';
import './styles/reset.css';
import {get, post } from './request/http';
import { Button, Form, Field, NavBar, RadioGroup, Radio, Switch } from 'vant';


Vue.use(Button).use(Form).use(Field).use(NavBar).use(RadioGroup).use(Radio).use(Switch);

Vue.config.productionTip = false;

Vue.prototype.$get = get;
Vue.prototype.$post = post;

// 自定义组件格式，全局可用
Object.keys(components).forEach(key => {
    // 首字母大写
    var name = key.replace(/(\w)/, v => v.toUpperCase());

    //使用标签时前缀需要加 g- 以示区别
    Vue.component(`v${name}`, components[key]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");