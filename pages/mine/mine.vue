<template>
	<view >
		<!-- px和upx的区别 -->
<!-- 		<view class="box1"></view>
		<view class="box2"></view> -->
		
		<!-- 做一个锚点的效果 -->
		<!--如果要进行一些dom操作 -->
		<view class="Id">
			<view class="left">
				<view 
					v-for="(item,index) in list" 
					:key="index" 
					@click="setId(index)"
					:class="{active:index ===currentNum }"
					>
					{{item.title}}
				</view>
			</view>
			<!-- 
				第一步：滚动左边右边跟着动 
					用到了:scroll-into-view="clickId"
					然后给内部view一个对应id
					left给一个id转换的方法
				第二步：滚动右边左边跟着动
				双联动
					1.首先加一个scroll方法
					2.再判断一个滑倒底部的方法scrolltolower
					3.以及获取元素的链式方法
					const query = uni.createSelectorQuery().in(this);
					query.selectAll('.title')
					.boundingClientRect()
					.exec((res)=>{})
					
			-->
			
			<view class="right">
				<scroll-view 
				:scroll-y="true"
				 style="white-space:nowrap;height: 200px;"
				:scroll-into-view="clickId"
				:scroll-with-animation="true"
				@scroll="scroll"
				@scrolltolower="scrolltolower"
				 >
					
					<view v-for="(item,index) in list" :key="index">
						<view class="title" :id="'po' + index" >{{item.title}}</view>
						<view v-for="(it,idx) in item.list" :key="idx">
							{{it}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<uni-badge text="1"></uni-badge>
		<view>Vuex测试</view>
		<view>名字:{{name}}</view>
<!-- 		<view>价格:</view> -->
		<view>数量:{{num}}</view>
		<view>总价:{{total}}</view>

		<button type="primary" @click="add">add</button>
		<button type="default" @click="testActions"> testActions</button>
		
		<view v-for="(item,index) in testList" :key="index" > {{item}}</view>
		
		
	</view>

</template>

<script>
	import uBadge from "../../components/uni-badge/uni-badge.vue"
	export default {
		data() {
			return {
				msg:"hello",
				list:[
					{title:"法餐",list:["法餐1","法餐2","法餐3","法餐4"]},
					{title:"快餐",list:["快餐1","快餐2","快餐3","快餐4"]},
					{title:"中餐",list:["中餐1","中餐2","中餐3","中餐4"]},
					{title:"西餐",list:["西餐1","西餐2","西餐3","西餐4"]}
				],
				clickId:"",
				currentNum:0,
				topList:[],
				name:this.$store.state.name
			}
		},
		components:{
			uBadge
		},
		onReady(){
			
			this.getNodesInfo();
			
			
			this.testRequest()
		},
		computed:{
			//涉及到变得值，我们要放到这里，getter里边的数据
			//或者commit或者dispatch提交变化的数据也要放在这里
			num(){
				return this.$store.state.num;
			},
			total(){
				return this.$store.getters.total
			},
			testList(){
				return this.$store.state.testList;
			}
			
		},
		methods: {
			//同步
			add(){
				this.$store.commit("add");
			},
			testActions(){
				this.$store.dispatch("testActions")
			},
			setId(index){
				this.clickId = "po" + index;
				this.currentNum = index;
			},
			scroll(e){
				//通过scrollTop得出区间，然后联动左边
				console.log(e.target.scrollTop);
				let scrollTop = e.target.scrollTop;
				for(let i = 0;i< this.topList.length ; i++){
					
					//0的时候是第一个和第二个
					//1的时候是第二个和第三个
					//2的时候是第三个和第四个
					//3的时候是第四个和第五个
					//所以i==3的时候实际上就不用判断了
					let h1 = this.topList[i];
					let h2 = this.topList[i+1];
					console.log("-----",i+1);
					
					if(i+1==this.topList.length){
						console.log(h2);//undefined,下边判断也就不会通过了
					}
					
					if(scrollTop >= h1 && scrollTop<=h2){
						this.currentNum = i;
					}
					
				}
			},
			
			scrolltolower(){
				setTimeout(()=>{
					this.currentNum = this.topList.length-1;
				},80);
			},
			//注意一点小程序里边是没有浏览器的渲染引擎的
			//所以没有dom和bom，我们只能使用uni-app提供的api
			getNodesInfo(){
				const query = uni.createSelectorQuery().in(this);
				//选中所有的title
				/*
				query.selectAll('.title').boundingClientRect((data)=>{
				 	console.log(data)
				}).exec();
				*/
				
				//这种链式执行比较舒服，前边是操作，后边是回调
				query.selectAll('.title').boundingClientRect().exec((res)=>{
					console.log(res);
					let nodes = res[0];
					let rel = [];
					nodes.forEach(item=>{
						rel.push(item.top);
					})
					this.topList = rel;
				})
				
			},
			
			//测试请求
			testRequest(){
				uni.request({
					url:"https://bird.ioliu.cn/weather",
					data:{
						city:"北京"
					},
					header:{
						"token":"xxx"
					},
					success:(res)=>{
						console.log(res);
					}
					
				})
			}

		}
	}
</script>

<style lang="scss">
.box1{
	width: 100px;
	height: 100px;
	background: red;
	
}

//和上边px是1：2的关系
//而且upx可以根据机型自己等比例拓展，而px就不可以了
.box2{
	width: 200upx;
	height: 200upx;
	background: yellow;
	
}

.active{
	background: red;
}


.Id{
	display: flex;
	.left{
		width: 100px;
		border: 1px solid red;
	}
	.right{
		flex: 1;
		border: 1px solid red;
		.title{
			font-size: 20px;
			font-weight: bold;
			background: pink;
		}
	}
	
	
}

</style>
