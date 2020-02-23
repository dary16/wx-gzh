import axios from 'axios';
import { Toast } from 'vant';
import store from '@/store/index';
import router from '../router';

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    })
}

/**
 * 跳转登录页
 * 携带当前页面路由，在登录完成后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/Login',
        query: { rediect: router.currentRoute.fullPath }
    })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    //状态码判断
    switch (status) {
        //401:未登录状态
        case 401:
            toLogin();
            break;
            //403 token过期
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
            //404 不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            console.log('other');
    }
}

//创建axios实例
var instance = axios.create({
    timeout: 1000 * 12
})

//post请求头设置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.defaults.baseURL = '/api';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

//响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const { response } = error;
        if (response) {
            //请求已发出，但不在2xx范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            //断网情况
            store.commit('changeNetwork', false);
        }
        // if (error.response.status) {
        //     switch (error.response.status) {
        //         //401未登录。注册
        //         case 401:
        //             router.replace({
        //                 path: '/Login',
        //                 query: { rediect: router.currentRoute.fullPath }
        //             });
        //             break;
        //         case 403:
        //             //403 token过期
        //             Toast({
        //                 message: '登录过期，请重新登录',
        //                 duration: 1000,
        //                 forbidClick: true
        //             });
        //             //清除token
        //             localStorage.removeItem('token');
        //             store.commit('loginSuccess', null);
        //             //跳转登录页面，并将要浏览的页面fullPath传过去
        //             setTimeout(() => {
        //                 router.replace({
        //                     path: '/Login',
        //                     query: { rediect: router.currentRoute.fullPath }
        //                 })
        //             }, 1000);
        //             break;
        //         case 404:
        //             Toast({
        //                 message: '网络请求不存在',
        //                 duration: 1500,
        //                 forbidClick: true
        //             });
        //             break;
        //             //其他错误
        //         default:
        //             Toast({
        //                 message: error.response.data.message,
        //                 duration: 1500,
        //                 forbidClick: true
        //             });
        //     }
        //     return Promise.reject(error.response);
        // }
    }
);

export default instance;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} param [请求时携带的参数]
 */

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
    });
}