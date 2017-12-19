<template>
  <div id="app">
    <h3>{{msg}}</h3>
    <div>
      <router-link to="/home">主页</router-link> 
      <router-link to="/news">新闻</router-link>
    </div>
    <div>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </div>
    <button @click="send">发送ajax请求</button>
    <myButton @click.native="send"></myButton>
  </div>
</template>

<script>
import myButton from './components/myButton.vue'
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      console.log(this.$route);
    },
    watch:{
      // 进行路由的监视
      $route:function(newValue,oldValue){
        console.log('路由发生变化,跳转到'+newValue);
      }
    },
    methods:{
      send(){
        this.$http.get('https://api.github.com/users/tangyang8942')
          .then(res=>{
            console.log(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
    components:{
      myButton
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
