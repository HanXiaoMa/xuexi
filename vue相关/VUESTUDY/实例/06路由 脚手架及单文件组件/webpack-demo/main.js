/*
    使用Es6的语法引入模块
*/ 
import Vue from 'vue';
import App from './App.vue';

new Vue({
    el:'#app',
    // 注册App.vue根组件
    render:function(h){
        return h(App);
    }
});