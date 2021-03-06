<template>
	<view class="content">
		<view class="text-area">
		<!--<test :msg ="msg" @dosomething = "test"></test> -->
			<test :msg ="msg"></test>
		</view>
		<view>------</view>
		<button type="primary" @click="toPath"> toOne</button>
		
		<!-- 动态样式 -->
		<view :class="'box' + 1">test</view>
		<!-- class的对象形式和数组形式 -->
		<view :class="{box111:true}"></view>
		<view :class="['box111','box222']"></view>
		<view :class="[{box111:true},'box222']"></view>
		
		<view :style="{width:'100px',height:'100px',background:'red'}" ></view>
		<!-- 数组形式也可可以 -->
        <view :style="[{width:'100px',height:'100px',background:'green'}]" ></view>
		
		<view 
			v-for="(item,index) in names"
			:key = "index"
			:class="{box333:index==currentIndex}"
			@click="onSelect(index)"
		>
			{{item}}
		</view>

	
		<view style="background: green;"> {{tools.my_slice("123456789",0,5)}}</view>
		
		
		
	</view>
</template>

<script module="tools" lang="wxs" src="../../wxs/string.wxs"></script>

<script>
	import test from "../../components/test.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				msg:"qc",
				names:["lili",'qqqqq','hhaha',"jjjjj"],
				currentIndex:0
			}
		},
		components:{
			test
		},
		onLoad() {
			/*
			uni.$on("testName",(rel)=>{
				console.log(rel);
			})
			*/
		   uni.$once("testName",(rel)=>{
			   console.log(rel);
		   })
		    
		},
		methods: {
			test(rel){
				console.log(rel)	
			},
			onSelect(index){
				this.currentIndex = index;
			},
			toPath(){
				
				//跳tabbar配置页面
				// uni.switchTab({
				// 	url:"../news/news"
				// })
				
				//跳非tabbar配置页面
				uni.navigateTo({
					url:"../one/one?name=qc"
				})
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.box111{
		width:100px;
		height: 100px;
		background: pink;
		
	}
	.box222{
		border: 1px solid red;
		
	}
	.box333{
		background: yellow;
	}


</style>
