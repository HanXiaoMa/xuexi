<template>
  <div id="app">
    <button @click="Increament">+</button>
    <button @click="dicreament">-</button>
    <button @click="IncreamentAsync">++</button>
    <p>当前数字为：{{count}}</p>
    <p>当前数字为：{{isEventOdd}}</p>
  </div>
</template>

<script>
// 方式2
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  // 方式1
  // computed:{
  //   count(){
  //     return this.$store.state.count;
  //   }
  // }

  // 方式2
  // computed:mapState([//这里对应的是state
  //   'count'
  // ]),
  computed:mapGetters([//这个对应的是getters
    'count',
    'isEventOdd'
  ]),
  methods:mapActions([
    'Increament',
    'dicreament',
    'IncreamentAsync'
  ])
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

h1, h2 {
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
