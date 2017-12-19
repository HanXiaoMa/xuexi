/*
    vuex配置
*/

// 导入所需的模块
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 定义属性(数据)
var state = {
    count: 6
}

// 定义getters,是用来获取属性的
var getters = {
    count(state) {
        return state.count;
    },
    isEventOdd(state){
        return state.count%2==0?"偶数":"奇数";
    }
}

// 定义actions,要执行的操作:如一些流程的控制判断或者异步请求
const actions = {
    Increament(context) {
        context.commit('Increament'); //提交一个名为In的变化,名字任意
    },
    dicreament(context) {
        if (state.count > 0) {
            context.commit('dicreament');
        }
    },
    IncreamentAsync({commit,state}) {
        // 异步操作
        var p = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve();
            },3000);
        });
        p.then(()=>{
            commit('Increament');
        });
    }
}

// 定义mutations,处理状态(数据)的改变
const mutations = {
    Increament(state) {
        state.count++;
    },
    dicreament(state) {
        state.count--;
    }
}

// 创建store对象
const store = new Vuex.Store({state, getters, actions, mutations});

// 导出store对象
export default store;