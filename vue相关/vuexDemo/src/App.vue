<template>
  <div id="app">
    <m-tv-header v-show="headerShow"></m-tv-header>
    <router-view></router-view>
    <m-tv-footernav v-show="footerShow"></m-tv-footernav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  computed:mapGetters([
    'headerShow',
    'footerShow'
  ]),
  mounted(){
    var path=this.$route.path.substring(1);
    this.headerChange(path);
    this.footerChange(path);
  },
  watch:{
      $route(to){
        var path=to.path.substring(1);
        this.headerChange(path);
        this.footerChange(path);
      }
    },
  components:{
    'm-tv-header':Header,
    'm-tv-footernav':Footer
  },
  methods:{
    headerChange(path){
      if(path=='details'){
        this.$store.dispatch('hideHead');
      }else{
        this.$store.dispatch('showHead');
      }
    },
    footerChange(path){
      if(path=='details'){
        this.$store.dispatch('hidefooter');
      }else{
        this.$store.dispatch('showfooter');
      }
    }
  }
  
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  ul,ol,li{
    list-style: none;
  }
  a{
    text-decoration: none;
    color: #333;
  }
</style>
