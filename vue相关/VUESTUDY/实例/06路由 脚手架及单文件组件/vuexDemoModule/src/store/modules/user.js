/*
    用户模块
*/ 

import types from '../types.js';

const state={
    count:6
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
    Increament({commit,state}) {
        commit(types.INCREAMENT); //提交一个名为In的变化,名字任意
    },
    dicreament(context) {
        if (state.count > 0) {
            context.commit(types.DICEAMENT);
        }
    }
    
}

// 定义mutations,处理状态(数据)的改变
const mutations = {
    [types.INCREAMENT](state) {
        state.count++;
    },
    [types.DICEAMENT](state) {
        state.count--;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}