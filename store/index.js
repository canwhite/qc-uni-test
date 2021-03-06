import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);
export default new Vuex.Store({
	//全局属性变量
	state:{
		num:0,
		price:10,
		name:"苹果",
		testList:[]
	},
	//全局同步方法,使用方法this.$store.commit("xxx")
	mutations:{
		add(state){
			state.num++;
		}
	},
	//Vuex属性计算，在视图里边当变量使用
	getters:{
		total(state){
			return state.num * state.price
		}
	},
	//异步方法，调用方法，this.$store.dispatch("xxx")
	actions:{
		testActions(context){
			//context里边包含了state,mutation,getters,actions
			//相当于异步请求得到值，然后在视图中显示值
			setTimeout(()=>{
				context.state.testList = ["1","2","3","4"];
			},2000);
			
		}
	}
	
	
	
})