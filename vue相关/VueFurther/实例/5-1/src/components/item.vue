<template>
	<div class="itemWrap" @click="fn">
		<!-- 知识点1：slot槽口的应用 一般情况下使用槽口需要外部包一层span或者其它html,因为槽口本身不能使用指令等Vue自带的功能-->
		<!-- 
			知识点3：指令v-show的应用
		 -->
		<span v-show="bol"><slot name="normalImg"></slot><br/></span>
		<span v-show="!bol"><slot name="activeImg"></slot><br/></span>
		<!-- 
			知识点6：v-bind
		 -->
		<span :class="{active:!bol}">{{ txt }}</span>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		// 知识点4：计算属性，定义需要通过简单逻辑判断后，才能最终确定值的变量
		computed:{
			bol:function(){
				// 如果mark的值等于sel的值,返回false
				if(this.mark==this.sel){
					return false;
				}
				return true;
			}
		},
		// 知识点2：props的应用
		props:['txt','mark','sel'],
		methods:{
			fn(){
				// 知识点5：$emit
				this.$emit('changedata',this.mark);
			}
		}

	}

	//给每个item添加一个mark，做为唯一标识
	//声明一个变量selected来记录被选中item的mark
</script>
<style>
	.itemWrap {width: 20%; float: left; text-align: center;}
	.itemWrap img {width: 45px;}
	.itemWrap span {font-size: 12px; color: #999;}
	.itemWrap .active {color: #e5173a;}
</style>