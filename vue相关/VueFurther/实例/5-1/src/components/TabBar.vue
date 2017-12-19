<template>
  <div class="tabbarWrap">
    <Itemmmm txt="首页" mark="1" :sel="selected" @changedata="getVal">
    	<img src="../assets/img/1.png" alt="" slot="normalImg">
    	<img src="../assets/img/6.png" alt="" slot="activeImg">
    </Itemmmm>
    <Itemmmm txt="分类" mark="2" :sel="selected" @changedata="getVal">
    	<img src="../assets/img/2.png" alt="" slot="normalImg">
    	<img src="../assets/img/7.png" alt="" slot="activeImg">
    </Itemmmm>
    <Itemmmm txt="发现" mark="3" :sel="selected" @changedata="getVal">
    	<img src="../assets/img/3.png" alt="" slot="normalImg">
    	<img src="../assets/img/8.png" alt="" slot="activeImg">
    </Itemmmm>
    <Itemmmm txt="购物车" mark="4" :sel="selected" @changedata="getVal">
    	<img src="../assets/img/4.png" alt="" slot="normalImg">
    	<img src="../assets/img/9.png" alt="" slot="activeImg">
    </Itemmmm>
    <Itemmmm txt="我的考拉" mark="5" :sel="selected" @changedata="getVal">
    	<img src="../assets/img/5.png" alt="" slot="normalImg">
    	<img src="../assets/img/10.png" alt="" slot="activeImg">
    </Itemmmm>
  </div>
</template>

<script>
import Itemmmm from './item.vue'
export default {
  name: 'TabBar',
  components: {
    Itemmmm
  },
  data () {
    return {
      selected:1
    }
  },
  methods:{
  	getVal:function(val){
  		this.selected=val;
  	}
  }
}
</script>

<style scoped>
.tabbarWrap {width: 100%; height: 64px; position: fixed; left: 0; bottom: 0; border-top: 1px solid #ccc;}
</style>
