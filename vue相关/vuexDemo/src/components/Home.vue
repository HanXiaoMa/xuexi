<template>
	<div>
		<!-- <m-tv-header></m-tv-header> -->
		<h3>I am Home</h3>
		<button @click="nextPage">跳转到详情页</button>
		<!-- <m-tv-footernav></m-tv-footernav> -->
	</div>
</template>
<script>
	// import Header from './Header.vue'
	// import Footer from './Footer.vue'
	export default{
		data(){
			return{

			}
		},
		methods:{
			nextPage(){
				this.$router.push('/details')
			}
		},
		components:{
			// 'm-tv-header':Header,
			// 'm-tv-footernav':Footer
		}
	}
</script>
<style>
	
</style>