<template>
	<view>
		<text>
			我是test组件{{msg}}
		</text>
		<button type="primary" @click="myClick"> click</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:["msg"],
		//组件的生命周期就类似于vue的生命周期了
		created() {
			console.log("初始化执行一次");
		},
		mounted() {
			console.log('真实节点加载完毕');
		},
		
		
		methods:{
			myClick(){
				//this.$emit("dosomething",{name:"mc"})
				uni.$emit("testName",{name:"lucy"})
			}
			
		}
	}
</script>

<style>

</style>
