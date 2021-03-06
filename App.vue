<script>
	//本模块用来配置应用的全局样式，以及监听应用的生命周期
	export default {
		//option对应着场景值
		onLaunch: function(option) {
			console.log('App Launch')
			// console.log(option)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
