<template>
    <div>
        <h3>this is a Vue hello world</h3>
        <h2>{{name}}</h2>
        <button @click="change">改变值</button>
        <User></User>
    </div>
</template>
<script>
    // 导入模块
    import User from './components/User.vue';
    export default{
        data(){
            return{
                name:'jerry'
            }
        },
        methods:{
            change(){
                this.name="tom";
            }
        },
        components:{
            User
        }
    }
</script>
<style>
    body{
        background:#fff;
    }
</style>