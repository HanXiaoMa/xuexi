<template>
	<div class="tabbarWrapper">
		<Item txt="首页" mark="home" :sel="selected" @changedata="getVal">
			<img src="../assets/images/ic_tab_home_active.png" alt="" slot="activeImg">
			<img src="../assets/images/ic_tab_home_normal.png" alt="" slot="normalImg">
		</Item>
		<Item txt="书影音" mark="audio" :sel="selected" @changedata="getVal">
			<img src="../assets/images/ic_tab_subject_active.png" alt="" slot="activeImg">
			<img src="../assets/images/ic_tab_subject_normal.png" alt="" slot="normalImg">
		</Item>
		<Item txt="广播" mark="broadcast" :sel="selected" @changedata="getVal">
			<img src="../assets/images/ic_tab_status_active.png" alt="" slot="activeImg">
			<img src="../assets/images/ic_tab_status_normal.png" alt="" slot="normalImg">
		</Item>
		<Item txt="小组" mark="group" :sel="selected" @changedata="getVal">
			<img src="../assets/images/ic_tab_group_active.png" alt="" slot="activeImg">
			<img src="../assets/images/ic_tab_group_normal.png" alt="" slot="normalImg">
		</Item>
		<Item txt="我的" mark="mine" :sel="selected" @changedata="getVal">
			<img src="../assets/images/ic_tab_profile_active.png" alt="" slot="activeImg">
			<img src="../assets/images/ic_tab_profile_normal.png" alt="" slot="normalImg">
		</Item>
	</div>
</template>
<script>
	import Item from './item.vue'
	export default {
		data(){
			return {
				selected:'home'
			}
		},
		components:{
			Item
		},
		methods:{
			getVal(val){
				this.selected=val;
			}
		}
	}
</script>
<style>
	.tabbarWrapper{
		width: 100%;
		height: 64px;
		border-top: 1px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>