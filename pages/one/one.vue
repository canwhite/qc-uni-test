<template>
	<view>
		我是one页面
		<button type="primary" @click="goPath">goTwo</button>
		<text>------------</text>
		<button type="primary" @click="goback">goback</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goPath(){
				//清空所有栈跳新栈，但是注意这时候下边的goback就没有用了
				uni.redirectTo({
					url:'../two/two'
				})
			},
			goback(){
				//出栈
				uni.navigateBack()//默认-1
				
			},

			
		},
		onLoad(options) {
			console.log(options);
		}
	}
</script>

<style>

</style>
