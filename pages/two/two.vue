<template>
	<view>
		<button type="primary" @click="goPath">goOne</button>
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
				uni.redirectTo({
					url:"../one/one"
				})
				
			}
			
		}
	}
</script>

<style>

</style>
