<template>
	<div class="itemWrapper" @click="send">
		<span v-show="bol"><slot name="activeImg"></slot></span>
		<span v-show="!bol"><slot name="normalImg"></slot></span>
		<span :class="{active:bol}">{{ txt }}</span>
	</div>
</template>
<script>
	export default {
		computed:{
			bol:function(){
				if(this.mark==this.sel){
					return true;
				}
				return false;
			}
		},
		props:['txt','mark','sel'],
		methods:{
			send(){
				this.$emit('changedata',this.mark);
				this.$router.push('/'+this.mark);
			}
		},
		beforeCreate(){
			this.$router.push('/');
		}
		
	}
</script>
<style>
	.itemWrapper{
		width: 20%;
		float: left;
		text-align: center;
	}
	.itemWrapper img{
		width: 40px;
		display: block;
		margin: 0 auto;
	}
	.itemWrapper span{
		font-size: 12px;
		color: #999;
	}
	.itemWrapper span.active{
		color: #42bd56;
	}
</style>