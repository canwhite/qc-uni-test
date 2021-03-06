<template>
	<view>
		<!-- view组件个人感觉有点像是div -->
		<view>xxx</view>
		
		<!--然后试一下swipper -->
		<swiper @change="test" indicator-dots="true" autoplay="true" interval="1500">
			<!-- 然后在里边放的是item -->
			<swiper-item>
				<!-- 开始在内部放图片 -->
				<image src="https://pic4.zhimg.com/v2-800e212c28466481869c36531471fa1a_1440w.jpg?source=172ae18b"> </image>
			</swiper-item>
			<swiper-item>
				<image src="https://pic4.zhimg.com/v2-800e212c28466481869c36531471fa1a_1440w.jpg?source=172ae18b"> </image>
				
			</swiper-item>
			<swiper-item>
				<image src="https://pic4.zhimg.com/v2-800e212c28466481869c36531471fa1a_1440w.jpg?source=172ae18b"> </image>				
			</swiper-item>
		</swiper>
		
		<!--试验一下-->
		<scroll-view :scroll-x="true" style="white-space: nowrap;">
			<view style="display: inline-block;width: 200px;height: 100px;background: red;"></view>
			<view style="display: inline-block;width: 200px;height: 100px;background: green;"></view>
			<view style="display: inline-block;width: 200px;height: 100px;background: blue;"></view>
		</scroll-view>


	
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				title:"新闻",

			}
		},
		onLoad(){
			
			console.log("页面初始化执行 执行一次 onLoad" );
		},
		onReady(){
			
			console.log("页面加载完毕 执行一次 onReady" );
			
		},
		onShow(){
			
			console.log("页面进入执行 执行多次 onShow");
			
		},
		onHide(){
			
			console.log("页面离开执行 执行多次 onHide");
		
		},
		onPullDownRefresh(){
			console.log("用户执行了下拉动作");
		},
		
		onReachBottom(){
			console.log("用户将页面滚动到了底部");
		},
		
		onTabItemTap(){
			console.log("用户点击了Tabbar")
			
		},
		onShareAppMessage(){
			console.log("用户进行了分享");
			//可以设置转发内容
			return{
				title:"我是这条街最靓的崽崽",
				path:"pages/news/news",
				imageUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg4.duote.com%2Fduoteimg%2Fdtnew_newsup_img%2F202102%2F20210225100222_25165.jpg&refer=http%3A%2F%2Fimg4.duote.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616912736&t=aba2c1196154fd680fc440c44a01cbf1",
			}
		},
		
		//页面滚动
		onPageScroll(){
			//这个执行频率很高的
			console.log('用户在滚动页面');
			
		},
		
		
		methods: {
			test(e){
				
				console.log(e.detail.current)
			}

			
			
		}
	}
</script>

<style lang="scss">



</style>
